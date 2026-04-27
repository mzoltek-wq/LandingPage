const baseValidators = {
  name: {
    message: "Please enter your name.",
    validate: (value) => value.trim().length > 1,
  },
  email: {
    message: "Please enter a valid work email.",
    validate: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()),
  },
  company: {
    message: "Please enter your company name.",
    validate: (value) => value.trim().length > 1,
  },
  sessionType: {
    message: "Please choose a session type.",
    validate: (value) => value.trim() !== "",
  },
  message: {
    message: "Please add a message when session type is Other.",
    validate: (value, field) => {
      const form = field.form;
      const sessionType = form?.querySelector('[name="sessionType"]')?.value;
      return sessionType !== "other" || value.trim().length > 0;
    },
  },
  submissionTitle: {
    message: "Please enter a submission title.",
    validate: (value) => value.trim().length > 2,
  },
  ideaCategory: {
    message: "Please choose a category.",
    validate: (value) => value.trim() !== "",
  },
  requestDescription: {
    message: "Please describe the request in a bit more detail.",
    validate: (value) => value.trim().length > 15,
  },
  questionName: {
    message: "Please enter your name.",
    validate: (value) => value.trim().length > 1,
  },
  questionText: {
    message: "Please enter a question.",
    validate: (value) => value.trim().length > 8,
  },
};

function setFieldError(field, message) {
  const errorElement = document.getElementById(`${field.id}-error`);

  field.classList.toggle("invalid", Boolean(message));
  field.setAttribute("aria-invalid", message ? "true" : "false");

  if (errorElement) {
    errorElement.textContent = message || "";
  }
}

function validateField(field) {
  const rule = baseValidators[field.name];

  if (!rule) {
    setFieldError(field, "");
    return true;
  }

  const isValid = rule.validate(field.value, field);
  setFieldError(field, isValid ? "" : rule.message);
  return isValid;
}

function initValidatedForm(form) {
  const statusMessage = form.querySelector(".form-status");
  const fields = Array.from(form.querySelectorAll("input, select, textarea"));

  fields.forEach((field) => {
    field.addEventListener("blur", () => validateField(field));
    field.addEventListener("input", () => {
      if (field.classList.contains("invalid")) {
        validateField(field);
      }
    });
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const requiredFields = fields.filter((field) => baseValidators[field.name]);
    const allValid = requiredFields.every((field) => validateField(field));

    if (!allValid) {
      const sessionTypeField = form.querySelector('[name="sessionType"]');
      const messageField = form.querySelector('[name="message"]');
      const suppressGlobalError =
        sessionTypeField?.value === "other" &&
        messageField?.classList.contains("invalid") &&
        requiredFields.filter((field) => field.classList.contains("invalid")).length === 1;

      statusMessage.textContent = suppressGlobalError
        ? ""
        : "Please fix the highlighted fields and try again.";
      statusMessage.style.color = "#b31a21";
      const firstInvalidField = requiredFields.find((field) => field.classList.contains("invalid"));

      if (firstInvalidField) {
        firstInvalidField.focus();
      }

      return;
    }

    if (form.classList.contains("js-idea-form")) {
      appendIdeaSubmission(form);
    }

    if (form.dataset.discussionTarget) {
      appendDiscussionEntry(form);
    }

    form.reset();
    fields.forEach((field) => setFieldError(field, ""));

    statusMessage.textContent =
      form.dataset.successMessage ||
      "Thanks. Your request has been captured. Replace this placeholder behavior with your scheduling workflow or backend submission.";
    statusMessage.style.color = "#13673c";
  });
}

document.querySelectorAll(".booking-form, .js-validated-form").forEach((form) => {
  initValidatedForm(form);
});

function syncSessionMessageRequirement(form) {
  const sessionTypeField = form.querySelector('[name="sessionType"]');
  const messageField = form.querySelector('[name="message"]');

  if (!sessionTypeField || !messageField) {
    return;
  }

  const requiresMessage = sessionTypeField.value === "other";
  messageField.required = requiresMessage;
  const messagePromptByType = {
    "technical-discussion":
      "Optional: Tell us what you're hoping to get out of this technical discussion.",
    "demo-session":
      "Optional: Tell us what you'd like to see from the platform in this demo.",
    "ai-blueprint-session":
      "Optional: Tell us about the manual processes, workflows, or coordination points you're looking to automate.",
    "first-use-case-support":
      "Optional: Tell us about the first use case you want help shaping or validating.",
    other: "Tell us what you're looking to discuss.",
  };

  messageField.placeholder =
    messagePromptByType[sessionTypeField.value] ||
    "Optional: Share any architecture context, goals, or technical questions ahead of the session.";

  if (messageField.classList.contains("invalid")) {
    validateField(messageField);
  }
}

document.querySelectorAll(".booking-form").forEach((form) => {
  const sessionTypeField = form.querySelector('[name="sessionType"]');

  if (sessionTypeField) {
    syncSessionMessageRequirement(form);
    sessionTypeField.addEventListener("change", () => syncSessionMessageRequirement(form));
  }
});

document.querySelectorAll("[data-session-choice]").forEach((link) => {
  link.addEventListener("click", () => {
    const bookingForm = document.querySelector(".booking-form");
    const sessionTypeField = bookingForm?.querySelector('[name="sessionType"]');
    const selectedValue = link.getAttribute("data-session-choice");

    if (!bookingForm || !sessionTypeField || !selectedValue) {
      return;
    }

    sessionTypeField.value = selectedValue;
    sessionTypeField.dispatchEvent(new Event("change", { bubbles: true }));
    validateField(sessionTypeField);
  });
});

function appendIdeaSubmission(form) {
  const targetId = form.dataset.appendTarget;
  const target = targetId ? document.getElementById(targetId) : null;

  if (!target) {
    return;
  }

  const title = form.querySelector('[name="submissionTitle"]')?.value.trim() || "New build idea";
  const company = form.querySelector('[name="company"]')?.value.trim() || "Submitted company";
  const name = form.querySelector('[name="name"]')?.value.trim() || "Submitted by";
  const categoryValue = form.querySelector('[name="ideaCategory"]')?.value || "ai";
  const categoryMap = {
    ai: "AI and agents",
    integration: "Integrations",
    automation: "Automation",
    experience: "Experience and apps",
  };

  const item = document.createElement("article");
  const content = document.createElement("div");
  const titleElement = document.createElement("strong");
  const meta = document.createElement("p");
  const track = document.createElement("span");

  item.className = "idea-queue-item";
  titleElement.textContent = title;
  meta.textContent = `Requested by ${name} at ${company}`;
  track.textContent = categoryMap[categoryValue] || "Submitted";

  content.append(titleElement, meta);
  item.append(content, track);

  target.prepend(item);
}

function appendDiscussionEntry(form) {
  const targetId = form.dataset.discussionTarget;
  const target = targetId ? document.getElementById(targetId) : null;

  if (!target) {
    return;
  }

  const name = form.querySelector('[name="questionName"]')?.value.trim() || "Team member";
  const role = form.querySelector('[name="questionRole"]')?.value.trim() || "Viewer";
  const question = form.querySelector('[name="questionText"]')?.value.trim() || "Question";

  const item = document.createElement("article");
  const author = document.createElement("strong");
  const meta = document.createElement("span");
  const body = document.createElement("p");

  item.className = "discussion-item";
  author.textContent = name;
  meta.textContent = role;
  body.textContent = question;

  item.append(author, meta, body);
  target.prepend(item);
}

const searchInput = document.getElementById("session-search");
const trackFilter = document.getElementById("track-filter");
const audienceFilter = document.getElementById("audience-filter");
const archiveCards = Array.from(document.querySelectorAll(".archive-card"));
const resultsCount = document.getElementById("results-count");
const emptyState = document.getElementById("empty-state");

function filterArchive() {
  if (!archiveCards.length) {
    return;
  }

  const searchTerm = searchInput ? searchInput.value.trim().toLowerCase() : "";
  const selectedTrack = trackFilter ? trackFilter.value : "all";
  const selectedAudience = audienceFilter ? audienceFilter.value : "all";

  let visibleCount = 0;

  archiveCards.forEach((card) => {
    const matchesTrack = selectedTrack === "all" || card.dataset.track === selectedTrack;
    const matchesAudience = selectedAudience === "all" || card.dataset.audience === selectedAudience;
    const cardText = `${card.textContent} ${card.dataset.keywords || ""}`.toLowerCase();
    const matchesSearch = searchTerm === "" || cardText.includes(searchTerm);
    const shouldShow = matchesTrack && matchesAudience && matchesSearch;

    card.hidden = !shouldShow;

    if (shouldShow) {
      visibleCount += 1;
    }
  });

  if (resultsCount) {
    resultsCount.textContent = `${visibleCount} session${visibleCount === 1 ? "" : "s"}`;
  }

  if (emptyState) {
    emptyState.hidden = visibleCount !== 0;
  }
}

[searchInput, trackFilter, audienceFilter].forEach((element) => {
  if (element) {
    element.addEventListener("input", filterArchive);
    element.addEventListener("change", filterArchive);
  }
});

filterArchive();

function fillText(id, value) {
  const element = document.getElementById(id);
  if (element) {
    element.textContent = value || "";
  }
}

function fillLink(id, href) {
  const element = document.getElementById(id);
  if (element) {
    element.href = href || "#";
  }
}

function appendListItems(targetId, items) {
  const target = document.getElementById(targetId);
  if (!target) {
    return;
  }

  target.innerHTML = "";
  items.forEach((item) => {
    const li = document.createElement(target.tagName === "UL" ? "li" : "span");
    li.textContent = item;
    target.append(li);
  });
}

function initSessionPage() {
  if (typeof sessionLibrary === "undefined") {
    return;
  }

  const params = new URLSearchParams(window.location.search);
  const sessionId = params.get("session");
  const session = sessionId ? sessionLibrary[sessionId] : null;

  if (!session || !document.getElementById("session-title")) {
    return;
  }

  document.title = `${session.title} | Build It Live`;
  fillText("session-track", session.track);
  fillText("session-title", session.title);
  fillText("session-summary", session.summary);
  fillText("session-date", session.date);
  fillText("session-duration", session.duration);
  fillText("session-audience", session.audience);
  fillText("session-strapline", session.strapline);
  fillText("session-description", session.description);
  fillText("session-outcome", session.outcome);
  fillText("session-hosts", session.hosts);
  fillText("session-level", session.level);
  fillText("session-video-id", session.videoId);
  fillText("session-video-id-meta", session.videoId);
  fillLink("session-watch-link", session.watchLink);
  fillLink("session-repo-link", session.repoLink);
  fillLink("session-repo-link-secondary", session.repoLink);
  fillLink("session-slides-link", session.slidesLink);
  fillLink("session-notes-link", session.notesLink);

  const topics = document.getElementById("session-topics");
  if (topics) {
    topics.innerHTML = "";
    session.topics.forEach((topic) => {
      const span = document.createElement("span");
      span.textContent = topic;
      topics.append(span);
    });
  }

  appendListItems("session-takeaways", session.takeaways);

  const assets = document.getElementById("session-assets");
  if (assets) {
    assets.innerHTML = "";
    session.assets.forEach((asset) => {
      const item = document.createElement("div");
      item.className = "resource-line";
      item.textContent = asset;
      assets.append(item);
    });
  }

  const discussion = document.getElementById("session-questions");
  if (discussion) {
    discussion.innerHTML = "";
    session.questions.forEach((question) => {
      const item = document.createElement("article");
      const author = document.createElement("strong");
      const role = document.createElement("span");
      const body = document.createElement("p");

      item.className = "discussion-item";
      author.textContent = question.author;
      role.textContent = question.role;
      body.textContent = question.text;
      item.append(author, role, body);
      discussion.append(item);
    });
  }

  const related = document.getElementById("related-sessions");
  if (related) {
    related.innerHTML = "";
    session.related.forEach((relatedId) => {
      const relatedSession = sessionLibrary[relatedId];

      if (!relatedSession) {
        return;
      }

      const link = document.createElement("a");
      link.className = "resource-line";
      link.href = `session.html?session=${relatedSession.id}`;
      link.textContent = relatedSession.title;
      related.append(link);
    });
  }

  const videoPlaceholder = document.getElementById("session-video-placeholder");
  if (videoPlaceholder) {
    videoPlaceholder.classList.add(session.thumbnailTheme || "theme-ai");
  }
}

initSessionPage();

function initTestimonialRotator() {
  const cards = Array.from(document.querySelectorAll("[data-testimonial-card]"));
  const dots = Array.from(document.querySelectorAll("[data-testimonial-dot]"));

  if (!cards.length || cards.length !== dots.length) {
    return;
  }

  let activeIndex = cards.findIndex((card) => card.classList.contains("is-active"));
  if (activeIndex < 0) {
    activeIndex = 0;
  }

  function setActive(index) {
    cards.forEach((card, cardIndex) => {
      card.classList.toggle("is-active", cardIndex === index);
    });

    dots.forEach((dot, dotIndex) => {
      dot.classList.toggle("is-active", dotIndex === index);
    });

    activeIndex = index;
  }

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => setActive(index));
  });

  window.setInterval(() => {
    const nextIndex = (activeIndex + 1) % cards.length;
    setActive(nextIndex);
  }, 4200);
}

initTestimonialRotator();

function initInternalAnchorLinks() {
  const internalLinks = Array.from(document.querySelectorAll('a[href^="#"]'));

  internalLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const href = link.getAttribute("href");

      if (!href || href === "#") {
        return;
      }

      const target = document.querySelector(href);

      if (!target) {
        return;
      }

      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.replaceState(null, "", href);
    });
  });
}

initInternalAnchorLinks();

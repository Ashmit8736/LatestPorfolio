export function validateProfile(data) {
  const { fullName, headline, shortBio, about } = data;
  if (!fullName || !headline || !shortBio || !about) {
    return 'Full name, headline, short bio, and about are required.';
  }
  return null;
}

export function validateExperience(data) {
  const { companyName, role, startDate, description } = data;
  if (!companyName || !role || !startDate || !description) {
    return 'Company name, role, start date, and description are required.';
  }
  return null;
}

export function validateEducation(data) {
  const { institution, degree } = data;
  if (!institution || !degree) {
    return 'Institution and degree are required.';
  }
  return null;
}

export function validateProject(data) {
  const { title, description, techStack } = data;
  if (!title || !description || !techStack) {
    return 'Title, description, and tech stack are required.';
  }
  return null;
}

export function validateSkill(data) {
  if (!data.name) return 'Skill name is required.';
  return null;
}

export function validateSocialLink(data) {
  const { platform, url } = data;
  if (!platform || !url) return 'Platform and valid URL are required.';
  return null;
}

export function validateContactMessage(data) {
  const { name, email, message } = data;
  if (!name || !email || !message) {
    return 'Name, email, and message are required.';
  }
  return null;
}

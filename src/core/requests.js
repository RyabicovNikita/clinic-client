export const request = ({ url = "", breadcrumb = "", options }) =>
  fetch(`http://localhost:5000/${breadcrumb ? `${breadcrumb}/` : ""}` + url, { ...options })
    .then((res) => res.json())
    .catch((e) => e);

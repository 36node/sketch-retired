export const Forms = new Map();

export function registerForm(form) {
  Forms.set(form.key, form);
}

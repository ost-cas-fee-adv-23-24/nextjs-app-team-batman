export const tagReplacement = (text: string) => {
  if (!text) {
    return undefined;
  }
  return text.replace(/#(\w+)/g, '<a href="/tag/$1" class="text-primary-600">#$1</a>');
};

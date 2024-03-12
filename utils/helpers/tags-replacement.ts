import { TAPIPost } from '@/utils/api/api-types';

export const tagReplacement = (post: TAPIPost) => {
  if (post.text) {
    return {
      ...post,
      text: post.text.replace(/#(\w+)/g, '<a href="/tag/$1" class="text-primary-600">#$1</a>'),
    };
    return post;
  }
};

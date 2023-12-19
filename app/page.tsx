/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */

import LivePosts from '@/demo-components/live-posts';
import LoginButton from '@/demo-components/login-button';
import LogoutButton from '@/demo-components/logout-button';
import NewPost from '@/demo-components/new-post';
import Post from '@/demo-components/post';
import { getPostList } from '@/mumble/api';
import { auth } from './api/auth/[...nextauth]/auth';

export default async function Home() {
  const session = await auth();
  const posts = await getPostList();

  return (
    <main>
      <h1>Hello In Mumble</h1>
      <p>This is a short demo for using the API with authentication.</p>
      {session ? (
        <div>
          <p>
            You are logged in as {session.user?.name} ({session.user?.email}).
          </p>
          <div>
            <LogoutButton />
          </div>
        </div>
      ) : (
        <div>
          <p>You are not logged in.</p>
          <div>
            <LoginButton />
          </div>
        </div>
      )}
      {session && (
        <div>
          <h2>Create a post</h2>
          <NewPost />
        </div>
      )}
      <div>
        <h2>Latest Posts</h2>
        <LivePosts />
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <Post post={post} />
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}

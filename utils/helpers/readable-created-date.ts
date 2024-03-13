import dayjs from 'dayjs';
import 'dayjs/locale/de';
import dayOfYear from 'dayjs/plugin/dayOfYear'; // Import the plugin
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);
dayjs.extend(dayOfYear);

export const readableCreatedDate = (date: Date) => {
  const now = dayjs();
  const postDate = dayjs(date);
  const diffInYears = now.diff(postDate, 'year');

  if (diffInYears >= 1 || (diffInYears === 0 && now.dayOfYear() < postDate.dayOfYear())) {
    return postDate.locale('de').format('D. MMMM YYYY');
  }

  const diffInDays = now.diff(postDate, 'day');

  if (diffInDays > 0) return postDate.locale('de').format('D. MMMM');

  const readableTime = postDate.locale('de').fromNow(true);
  if (readableTime === 'ein paar Sekunden') return 'gerade eben';
  if (readableTime === 'eine Minute') return 'vor einer Minute';
  return `vor ${postDate.locale('de').fromNow(true)}`;
};

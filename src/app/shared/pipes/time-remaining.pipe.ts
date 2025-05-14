import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeRemaining'
})
export class TimeRemainingPipe implements PipeTransform {

  transform(dueDate: string | Date): string {
    const now = new Date().getTime();
    const due = new Date(dueDate).getTime();
    const diffMs = due - now;

    const diffSeconds = Math.floor(Math.abs(diffMs) / 1000);
    const diffMinutes = Math.floor(diffSeconds / 60);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);
    const diffWeeks = Math.floor(diffDays / 7);
    const diffMonths = Math.floor(diffDays / 30);
    const diffYears = Math.floor(diffDays / 365);

    const isFuture = diffMs > 0;

    let timeText = '';

    if (diffYears >= 1) {
      timeText = `${diffYears} year${diffYears > 1 ? 's' : ''}`;
    } else if (diffMonths >= 1) {
      timeText = `${diffMonths} month${diffMonths > 1 ? 's' : ''}`;
    } else if (diffWeeks >= 1) {
      timeText = `${diffWeeks} week${diffWeeks > 1 ? 's' : ''}`;
    } else if (diffDays >= 1) {
      timeText = `${diffDays} day${diffDays > 1 ? 's' : ''}`;
    } else if (diffHours >= 1) {
      timeText = `${diffHours} hour${diffHours > 1 ? 's' : ''}`;
    } else if (diffMinutes >= 1) {
      timeText = `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''}`;
    } else {
      timeText = `${diffSeconds} second${diffSeconds > 1 ? 's' : ''}`;
    }

    return isFuture ? `Due in ${timeText}` : `Due ${timeText} ago`;
  }
}

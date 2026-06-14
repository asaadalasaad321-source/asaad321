import { format, addDays, differenceInDays, parse } from 'date-fns';
import { ar, enUS } from 'date-fns/locale';
import i18n from '../i18n';

const getLocale = () => (i18n.language === 'ar' ? ar : enUS);

export const formatDate = (date: string | Date, formatStr: string = 'yyyy-MM-dd'): string => {
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return format(dateObj, formatStr, { locale: getLocale() });
  } catch (error) {
    return '';
  }
};

export const formatDisplayDate = (date: string | Date): string => {
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return format(dateObj, 'PPP', { locale: getLocale() });
  } catch (error) {
    return '';
  }
};

export const addDaysToDate = (date: string | Date, days: number): Date => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return addDays(dateObj, days);
};

export const getDaysRemaining = (targetDate: string | Date): number => {
  const target = typeof targetDate === 'string' ? new Date(targetDate) : targetDate;
  const today = new Date();
  return differenceInDays(target, today);
};

export const formatTime = (timeString: string): string => {
  try {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours, 10);
    const minute = parseInt(minutes, 10);
    const period = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${String(displayHour).padStart(2, '0')}:${String(minute).padStart(2, '0')} ${period}`;
  } catch (error) {
    return timeString;
  }
};

export const getCurrentDate = (): string => {
  return format(new Date(), 'yyyy-MM-dd');
};

export const getMonthYear = (date: string | Date): string => {
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return format(dateObj, 'MMMM yyyy', { locale: getLocale() });
  } catch (error) {
    return '';
  }
};

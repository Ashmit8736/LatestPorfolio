import { pushToast } from '../components/common/Toaster';

export function toast(message, type = 'info') {
  return pushToast(message, type);
}

toast.success = (message) => pushToast(message, 'success');
toast.error = (message) => pushToast(message, 'error');
toast.info = (message) => pushToast(message, 'info');

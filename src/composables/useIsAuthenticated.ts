import { computed } from 'vue';
import { useMsal } from './useMsal';

export function useIsAuthenticated() {
  const { accounts } = useMsal();
  return computed<boolean>(() => accounts.value.length > 0);
}

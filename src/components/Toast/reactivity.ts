import create from 'solid-zustand'

interface NotificationState {
  visible: boolean
  notify: () => void
};

export const useNotification = create<NotificationState>(set => ({
  visible: false,
  notify: () => {
    set(() => ({ visible: true }))
    setTimeout(
      () => set(() => ({ visible: false })),
      5000,
    )
  },
}))

import create from 'solid-zustand'

interface NotificationState {
  visible: boolean
  notify: (detail?: string) => void
  detail: string
};

export const useNotification = create<NotificationState>(set => ({
  visible: false,
  detail: '',
  notify: (detail: string) => {
    set(() => ({ detail, visible: true }))
    setTimeout(
      () => set(() => ({ visible: false })),
      5000,
    )
  },
}))

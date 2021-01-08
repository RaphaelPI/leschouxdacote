interface ApiResponse<T> {
  ok: boolean
  errors?: Partial<Record<keyof T, string>>
}

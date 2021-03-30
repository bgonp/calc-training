const RightIcon = ({ color = '#ffffff' }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    width={48}
    height={48}
  >
    <path d='M0 0h24v24H0V0z' fill='none' />
    <path
      d='M9.29 6.71a.996.996 0 000 1.41L13.17 12l-3.88 3.88a.996.996 0 101.41 1.41l4.59-4.59a.996.996 0 000-1.41L10.7 6.7c-.38-.38-1.02-.38-1.41.01z'
      fill={`${color}`}
    />
  </svg>
)

export default RightIcon

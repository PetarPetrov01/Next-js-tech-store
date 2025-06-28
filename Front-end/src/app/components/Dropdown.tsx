import { useEffect, useRef } from 'react'

export default function Dropdown({
  children, 
  isOpen,
  className
}:{ 
  children: React.ReactNode, 
  isOpen: boolean,
  className?: string
}) {
  const dropdownContainerRef = useRef<HTMLDivElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let timeout: NodeJS.Timeout | null = null
    if (timeout) {
      clearTimeout(timeout)
    }

    if (isOpen) {
      dropdownContainerRef.current!.style.height = `${dropdownRef.current?.offsetHeight}px`
      timeout = setTimeout(() => {
        dropdownContainerRef.current!.style.height = 'auto'
      }, 200)
    } else {
      dropdownContainerRef.current!.style.height = `${dropdownRef.current?.offsetHeight}px`
      timeout = setTimeout(() => {
        dropdownContainerRef.current!.style.height = '0'
      })
    }
  }, [isOpen])

  return (
    <>
      <div ref={dropdownContainerRef} className={`h-0 overflow-hidden duration-300 ${className}`}>
        <div ref={dropdownRef}>{children}</div>
      </div>
    </>
  )
}

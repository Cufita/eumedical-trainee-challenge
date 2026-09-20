import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react'
import { Link, type LinkProps } from 'react-router-dom'
import { buttonClasses, type ButtonVariant } from './buttonStyles'

interface VariantProp {
  variant?: ButtonVariant
}

export function AnchorButton({
  variant,
  className,
  ...rest
}: VariantProp & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return <a className={buttonClasses(variant, className)} {...rest} />
}

export function LinkButton({ variant, className, ...rest }: VariantProp & LinkProps) {
  return <Link className={buttonClasses(variant, className)} {...rest} />
}

export function ActionButton({
  variant,
  className,
  type = 'button',
  ...rest
}: VariantProp & ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button type={type} className={buttonClasses(variant, className)} {...rest} />
}

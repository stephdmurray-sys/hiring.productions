import { VerifyClient } from '../../verify-client'

/**
 * Path-based verification route: /auth/verify/magiclink/XXX
 *
 * This is the form the sign-in email links to. It contains no `=` character,
 * so quoted-printable re-decoding in email pipelines (which eats `=` followed
 * by two hex digits) cannot mangle it. See verify-client.tsx for the story.
 */
export default async function VerifyPathPage({
  params,
}: {
  params: Promise<{ type: string; token: string }>
}) {
  const { type, token } = await params
  return <VerifyClient token={token} type={type} />
}

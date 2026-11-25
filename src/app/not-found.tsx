import { PageHead } from "@/components/PageHead";
import { Cta } from "@/components/ui";
export const metadata = { title: "Page not found" };
export default function NotFound() {
  return <PageHead tag="404" title="This page folded."><p className="mb-6">It may have moved. The rest of the site is still here.</p><Cta href="/">Go home</Cta></PageHead>;
}

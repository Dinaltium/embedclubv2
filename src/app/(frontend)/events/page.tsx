import { SidebarShell, MainbarShell } from "@/components/FrontendShell";
import {Carousel, Card} from "@/components/EventsCarousel";


type Events = {
  id: number
  category: string
  title: string
  date: string
  image?:
    | (number | null)
    | {
        id: number
        url?: string | null
        [key: string]: any
      }
}

export default async function Page() {
  return (
    <SidebarShell>
      <MainbarShell>
        <h1 className="text-left md:text-4xl font-light absolute top-20 left-20 text-xl">
          Recent Events
        </h1>
      </MainbarShell>
    </SidebarShell>
  );
}

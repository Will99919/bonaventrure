import { getContent } from "@/lib/content";
import { Curtain } from "@/components/site/Curtain";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { Manifeste } from "@/components/site/Manifeste";
import { Runway } from "@/components/site/Runway";
import { Protocole } from "@/components/site/Protocole";
import { Maison } from "@/components/site/Maison";
import { Marquee } from "@/components/site/Marquee";
import { Faq } from "@/components/site/Faq";
import { Journal } from "@/components/site/Journal";
import { Contact } from "@/components/site/Contact";

export default async function Home() {
  const content = await getContent();

  return (
    <>
      <Curtain />
      <Header />
      <main>
        <Hero title={content.texts.heroTitle} intro={content.texts.heroIntro} />
        <Manifeste text={content.texts.manifeste} />
        <Runway looks={content.looks} />
        <Protocole />
        <Maison
          bio={content.texts.bio}
          citation={content.texts.citation}
          portraitImage={content.texts.portraitImage}
        />
        <Marquee />
        <Faq faqs={content.faqs} />
        <Journal posts={content.posts} />
        <Contact contact={content.texts.contact} />
      </main>
    </>
  );
}

"use client";

import { useState } from "react";
import { SavingProvider } from "./SavingContext";
import { Sidebar, type AdminTab } from "./Sidebar";
import { TextsTab } from "./TextsTab";
import { MaisonTab } from "./MaisonTab";
import { LooksTab } from "./LooksTab";
import { JournalTab } from "./JournalTab";
import { FaqTab } from "./FaqTab";
import { AppointmentsTab } from "./AppointmentsTab";
import type { LookRecord } from "./LookCard";
import styles from "./Admin.module.css";

type AdminData = {
  texts: {
    heroTitle: string;
    heroIntro: string;
    manifeste: string;
    bio: string;
    citation: string;
    contact: string;
    portraitImage: string | null;
  };
  looks: LookRecord[];
  posts: Array<{ id: string; caption: string; image: string | null }>;
  faqs: Array<{ id: string; question: string; answer: string }>;
  appointments: Array<{
    id: string;
    name: string;
    contact: string;
    message: string;
    status: string;
    createdAt: string;
  }>;
};

export function AdminApp({ data }: { data: AdminData }) {
  const [tab, setTab] = useState<AdminTab>("textes");

  return (
    <SavingProvider>
      <div className={styles.shell}>
        <Sidebar
          active={tab}
          onChange={setTab}
          counts={{
            textes: 6,
            maison: data.texts.portraitImage ? 1 : 0,
            defile: data.looks.length,
            journal: data.posts.length,
            questions: data.faqs.length,
            rdv: data.appointments.length,
          }}
        />
        <div className={styles.content}>
          {tab === "textes" && <TextsTab initial={data.texts} />}
          {tab === "maison" && <MaisonTab initial={{ portraitImage: data.texts.portraitImage }} />}
          {tab === "defile" && <LooksTab initial={data.looks} />}
          {tab === "journal" && <JournalTab initial={data.posts} />}
          {tab === "questions" && <FaqTab initial={data.faqs} />}
          {tab === "rdv" && <AppointmentsTab initial={data.appointments} />}
        </div>
      </div>
    </SavingProvider>
  );
}

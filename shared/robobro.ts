// Source: https://unitewithukraine.givecloud.co/robobro
// Set enabled to false to remove both placements in the next web/app release.
export const robobroCampaign = {
  id: "robobro",
  enabled: true,
  url: "https://unitewithukraine.givecloud.co/robobro",
  organizer: "Unite with Ukraine",
} as const;

export const robobroCopy = {
  uk: {
    badge: "Підтримка України",
    pinned: "Закріплено",
    title: "Підтримайте RoboBro",
    summary:
      "Допоможіть забезпечити роботизовану евакуацію поранених і зменшити ризик для медиків на передовій.",
    post:
      "Ділимося збором Unite with Ukraine на підтримку RoboBro — проєкту роботизованої евакуації поранених. Ці системи допомагають рятувати життя та зменшувати ризик для медиків на передовій. Дізнайтеся більше про збір і зробіть внесок на сайті організатора.",
    donate: "Донатити",
    donateLabel: "Донатити на RoboBro — відкриється сайт Unite with Ukraine",
    destination: "Збір на сайті Unite with Ukraine ↗",
    imageAlt: "Роботизована платформа RoboBro для евакуації поранених",
    openErrorTitle: "Не вдалося відкрити збір",
    openErrorBody: "Спробуйте ще раз або відкрийте посилання у браузері:",
  },
  en: {
    badge: "Support Ukraine",
    pinned: "Pinned",
    title: "Support RoboBro",
    summary:
      "Help bring robotic evacuation to wounded defenders and reduce the risk to frontline medics.",
    post:
      "We’re sharing Unite with Ukraine’s fundraiser for RoboBro, a project supporting robotic evacuation of wounded defenders. These systems help save lives and reduce the risk to frontline medics. Learn about the campaign and contribute on the organizer’s website.",
    donate: "Donate",
    donateLabel: "Donate to RoboBro — opens Unite with Ukraine",
    destination: "Fundraiser on Unite with Ukraine ↗",
    imageAlt: "RoboBro robotic vehicle for evacuating wounded defenders",
    openErrorTitle: "Could not open the fundraiser",
    openErrorBody: "Please try again or open this link in your browser:",
  },
} as const;

export default function FaqPage() {
  const faqs = [
    { q: "Quels vehicules sont compatibles ?", a: "Tout vehicule equipe d'un autoradio d'origine avec Apple CarPlay filaire est compatible avec CarplayGO. Notre dongle convertit simplement le CarPlay filaire en sans fil." },
    { q: "Est-ce que le sans fil a de la latence ?", a: "Non. CarplayGO utilise un protocole Wi-Fi 5 GHz optimise specialement pour la projection d'ecran. La latence reste inferieure a 60 ms — imperceptible pour la navigation, la musique ou les appels." },
    { q: "Mon iPhone doit-il etre mis a jour ?", a: "Nous recommandons iOS 14 ou ulterieur pour une experience optimale. Les versions anterieures peuvent fonctionner, mais certaines fonctionnalites recentes de CarPlay pourraient manquer." },
    { q: "Peut-on utiliser CarplayGO sur Android Auto ?", a: "Non, les modeles actuels sont dedies exclusivement a Apple CarPlay. Une version Android Auto est en developpement." },
    { q: "La mise a jour du dongle est-elle possible ?", a: "Oui. Le dongle peut recevoir des mises a jour du firmware via Wi-Fi. Elles sont automatiques et ameliorent regulierement la compatibilite et les performances." },
    { q: "Quelle est la garantie ?", a: "Tous nos produits beneficient d'une garantie constructeur de 2 ans. En cas de probleme, nous procedons a un echange ou un remboursement selon votre preference." },
    { q: "Livrez-vous dans le monde entier ?", a: "Oui. La France metropolitaine est livree gratuitement en 48h. Pour l'international, des frais de port reduits s'appliquent selon la destination." },
  ];

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] pt-[100px] pb-20 px-5">
      <div className="max-w-[720px] mx-auto">
        <h1 className="text-[32px] font-semibold tracking-[-0.02em] text-[var(--color-text-primary)]">Foire aux questions</h1>
        <p className="mt-4 text-[17px] text-[var(--color-text-secondary)]">Tout ce que vous devez savoir sur CarplayGO.</p>

        <div className="mt-10 space-y-6">
          {faqs.map((faq, i) => (
            <div key={i} className="rounded-[var(--radius-lg)] bg-[var(--color-surface)] border border-[var(--color-border-light)] p-6">
              <h3 className="text-[16px] font-semibold text-[var(--color-text-primary)]">{faq.q}</h3>
              <p className="mt-3 text-[14px] text-[var(--color-text-secondary)] leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

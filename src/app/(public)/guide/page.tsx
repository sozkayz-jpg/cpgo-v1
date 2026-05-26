export default function GuidePage() {
  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] pt-[100px] pb-20 px-5">
      <div className="max-w-[800px] mx-auto">
        <h1 className="text-[32px] font-semibold tracking-[-0.02em] text-[var(--color-text-primary)]">
          Comment installer votre dongle CarplayGO
        </h1>
        <p className="mt-4 text-[17px] text-[var(--color-text-secondary)] leading-relaxed">
          L'installation de votre dongle CarplayGO se fait en trois etapes simples. Aucun outil requis.
        </p>

        <div className="mt-10 space-y-10">
          <div>
            <span className="text-[13px] font-semibold text-[var(--color-accent)] uppercase tracking-wide">Etape 1</span>
            <h2 className="text-[20px] font-semibold text-[var(--color-text-primary)] mt-2">Branchez le dongle</h2>
            <p className="mt-3 text-[15px] text-[var(--color-text-secondary)] leading-relaxed">
              Inserez le dongle CarplayGO dans un port USB libre de votre autoradio compatible avec Apple CarPlay (USB filaire). Le dongle s'allumera automatiquement.
            </p>
          </div>
          <div>
            <span className="text-[13px] font-semibold text-[var(--color-accent)] uppercase tracking-wide">Etape 2</span>
            <h2 className="text-[20px] font-semibold text-[var(--color-text-primary)] mt-2">Appairez votre iPhone</h2>
            <p className="mt-3 text-[15px] text-[var(--color-text-secondary)] leading-relaxed">
              Activez le Bluetooth et le Wi-Fi sur votre iPhone. Le dongle apparaitra dans vos peripheriques Bluetooth sous le nom "CarplayGO". Appuyez sur Connecter. Votre iPhone demandera confirmation : appuyez sur Utiliser CarPlay.
            </p>
          </div>
          <div>
            <span className="text-[13px] font-semibold text-[var(--color-accent)] uppercase tracking-wide">Etape 3</span>
            <h2 className="text-[20px] font-semibold text-[var(--color-text-primary)] mt-2">Roulez</h2>
            <p className="mt-3 text-[15px] text-[var(--color-text-secondary)] leading-relaxed">
              Desormais, a chaque demarrage du moteur, votre iPhone se reconnecte automatiquement au dongle et votre CarPlay demarre sans fil en quelques secondes. Plus besoin de cable.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

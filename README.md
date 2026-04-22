# FlightDesk — landing page (beta)

Page statique issue de Claude Design : un seul fichier `index.html` (HTML, CSS, JS, canvas).

## Prévisualisation locale

Depuis le dossier du projet :

```bash
python3 -m http.server 8080
```

Ouvrez [http://127.0.0.1:8080](http://127.0.0.1:8080).

## Publier sur GitHub (CLI)

Depuis ce dossier, connectez-vous une fois, puis créez le dépôt et poussez :

```bash
gh auth login
gh repo create flightdesk-landing --public --source=. --remote=origin --push
```

(Changez le nom `flightdesk-landing` si besoin.)

**Sans** la CLI : créez un dépôt vide sur GitHub, puis :

```bash
git remote add origin https://github.com/VOTRE_COMPTE/NOM_DU_REPO.git
git push -u origin main
```

## GitHub Pages

Dans le dépôt : **Settings → Pages** → source : branche `main`, dossier `/ (root)`.
Le site sera servi sur `https://VOTRE_COMPTE.github.io/NOM_DU_REPO/`.

## Archive

Le fichier `archive/claude-design-standalone-bundle.html` est l’export « bundle » (Claude Design) ; l’app visible est celle de `index.html`.


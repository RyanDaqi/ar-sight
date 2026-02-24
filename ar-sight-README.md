# AR-SIGHT — Spec Site Vitrine v1.0

> Product Designer Senior (Apple HIG) + Directeur Artistique Web  
> Statut : Prêt pour intégration HTML/CSS/JS ou Webflow  
> Langue : Français · Style : White Design · Apple-inspired

---

## Fichiers livrés

| Fichier | Contenu |
|--------|---------|
| `ar-sight-spec-complete.html` | Document de spec complet : Sitemap, Copywriting, Wireframes, Design System, SEO, Checklist |
| `ar-sight-design-system.css` | Tokens CSS complets (variables, composants, animations, responsive) |
| `ar-sight-interactions.js` | Micro-interactions vanilla JS (nav, FAQ, scroll reveal, formulaire, toast, counter) |
| `ar-sight-README.md` | Ce fichier — guide d'utilisation rapide |

---

## Démarrage rapide

### Intégration HTML/CSS/JS

```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="ar-sight-design-system.css">
</head>
<body>

  <!-- Votre contenu ici -->
  <!-- Utilisez les classes CSS définies dans le design system -->

  <script src="ar-sight-interactions.js" defer></script>
</body>
</html>
```

### Intégration Webflow

1. Copier les variables CSS (`:root { }`) dans **Webflow > Settings > Custom Code > Head**
2. Utiliser les classes CSS comme référence pour nommer les styles Webflow
3. Coller le JS dans **Webflow > Settings > Custom Code > Footer**

---

## Architecture décisionnelle rapide

### Règles non-négociables

- **1 seul `btn-primary` par section** — Le bleu est rare, donc précieux
- **`--color-accent` (#0A84FF) uniquement sur CTA et liens** — Jamais sur les titres, fonds, décorations
- **Pas de gradient** sauf blanc → surface-1 très subtil
- **Pas de photo stock chantier** — Rendu 3D ou captures AR stylisées uniquement
- **1 idée par section** — Si vous avez 2 messages, créez 2 sections

### Hiérarchie CTA

```
Primaire   : "Réserver une démo →"     → btn-primary, bleu
Secondaire : "Rejoindre la Beta"       → btn-secondary, outline bleu
Micro-CTA  : "Télécharger le PDF"      → btn-ghost, lien simple
            "Voir comment ça marche"   → btn-ghost avec arrow →
```

---

## Tokens CSS clés — référence rapide

### Couleurs

```css
--color-bg:           #FFFFFF   /* Fond */
--color-surface-1:    #F5F5F7   /* Sections alternées */
--color-text-primary: #1D1D1F   /* Titres */
--color-text-secondary:#6E6E73  /* Corps, sous-titres */
--color-accent:       #0A84FF   /* CTA uniquement */
--color-border:       rgba(0,0,0,0.08)
```

### Typographie (échelle)

```
72px — text-mega  — Hero grands écrans
56px — text-hero  — Hero standard
44px — text-3xl   — H1 page
32px — text-2xl   — H2 section
24px — text-xl    — H3, card titre
18px — text-md    — Lead
16px — text-base  — Corps
14px — text-sm    — Meta, nav
12px — text-xs    — Badges, hash
```

### Espacement (base 8px)

```
4px  — space-1    — Gaps microscopiques
8px  — space-2    — Gaps petits
16px — space-4    — Padding interne
24px — space-6    — Container padding
32px — space-8    — Card padding
64px — space-16   — Séparation blocs
96px — space-24   — Section padding-y
```

### Radius

```
6px    — radius-sm    — Badges, chips
12px   — radius-md    — Inputs
18px   — radius-lg    — Petites cards
24px   — radius-xl    — Cards standard
32px   — radius-2xl   — Cards pricing
9999px — radius-full  — Boutons, tags
```

---

## Classes composants

### Boutons

```html
<!-- Primaire -->
<button class="btn btn-primary">Réserver une démo →</button>

<!-- Secondaire -->
<button class="btn btn-secondary">Rejoindre la Beta</button>

<!-- Ghost -->
<a href="#" class="btn btn-ghost">Voir comment ça marche →</a>

<!-- Large (hero uniquement) -->
<button class="btn btn-primary btn-lg">Réserver une démo →</button>
```

### Formulaire

```html
<form data-form="contact">
  <div class="input-group">
    <label class="input-label" for="name">Prénom &amp; Nom</label>
    <input 
      class="input-field" 
      id="name" name="name" type="text" 
      placeholder="Jean Dupont"
      data-validate="required,minLength:2"
      autocomplete="name"
    >
  </div>

  <div class="input-group">
    <label class="input-label" for="email">E-mail</label>
    <input 
      class="input-field" 
      id="email" name="email" type="email"
      placeholder="jean@societe.fr"
      data-validate="required,email"
      autocomplete="email"
    >
  </div>

  <div class="input-group">
    <label class="input-label" for="metier">Métier</label>
    <select class="select-field" id="metier" name="metier" data-validate="required">
      <option value="">Sélectionner</option>
      <option value="cuisiniste">Cuisiniste / Agenceur</option>
      <option value="electricien">Électricien</option>
      <option value="conducteur">Conducteur de travaux</option>
      <option value="plaquiste">Plaquiste</option>
      <option value="autre">Autre</option>
    </select>
  </div>

  <div class="input-group">
    <label class="input-label" for="message">Message (optionnel)</label>
    <textarea class="textarea-field" id="message" name="message" 
      placeholder="Décrivez votre chantier…"></textarea>
  </div>

  <!-- Honeypot anti-spam -->
  <input type="text" name="website" style="position:absolute;left:-9999px;" tabindex="-1" aria-hidden="true">

  <button type="submit" class="btn btn-primary">Envoyer ma demande →</button>
</form>
```

### Cards

```html
<!-- Card standard -->
<div class="card">
  <div class="icon-wrap"><!-- SVG icône --></div>
  <h3 class="text-h3">Titre</h3>
  <p class="text-muted">Description</p>
</div>

<!-- Card pricing recommandée -->
<div class="card-pricing featured">
  <span class="badge badge-blue">Recommandé</span>
  <h3 class="text-h2">Pro</h3>
  <p class="stat-number">79 €<span style="font-size:1rem;font-weight:400;">/mois</span></p>
</div>
```

### FAQ accordéon

```html
<div class="faq-item">
  <button class="faq-question" aria-expanded="false">
    Quel smartphone est compatible avec AR-SIGHT ?
    <svg class="faq-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <path d="M12 5v14M5 12h14" stroke-linecap="round"/>
    </svg>
  </button>
  <div class="faq-answer">
    Tout iPhone 12 Pro ou supérieur (LiDAR intégré) et les Android compatibles ARCore.
  </div>
</div>
```

### Mode toggle App / Hub

```html
<div class="mode-toggle" role="tablist">
  <button class="mode-toggle-btn" data-target="app" role="tab">App</button>
  <button class="mode-toggle-btn" data-target="hub" role="tab">Hub Laser</button>
</div>

<div data-mode-panel="app" role="tabpanel">
  <!-- Contenu App -->
</div>
<div data-mode-panel="hub" role="tabpanel" hidden>
  <!-- Contenu Hub -->
</div>
```

### Stat chiffrée animée

```html
<!-- data-count = valeur finale, data-suffix = unité, data-decimals = décimales -->
<div class="stat-block">
  <div class="stat-number">
    <span data-count="87" data-suffix="%">87%</span>
  </div>
  <div class="stat-label">des litiges impliquent<br>l'absence de traçabilité</div>
</div>
```

### Preuve numérique

```html
<div class="card" style="max-width:400px;">
  <div class="badge badge-green" style="margin-bottom:16px;">✓ Scan certifié</div>
  <p style="font-size:0.875rem;color:#6E6E73;margin-bottom:8px;">14 janvier 2025 · 09:42 UTC</p>
  <div class="hash-display" data-copy="a3f1c9d2e5b7f4a8c1d3e6f9a2b5c8d1e4f7a0b3c6d9e2f5a8b1c4d7e0f3a6b9">
    sha256: a3f1c9d2e5b7f4a8c1d3e6f9a2b5c8d1…
  </div>
  <p style="font-size:0.75rem;color:#AEAEB2;margin-top:8px;margin-bottom:0;">
    Cliquer pour copier le hash complet
  </p>
</div>
```

---

## Structure HTML recommandée par page

### Page type (Home)

```html
<body>
  <header role="banner">
    <nav class="nav" aria-label="Navigation principale">
      <div class="nav-inner container">
        <a class="nav-logo" href="/">AR-SIGHT</a>
        <button data-nav-toggle aria-expanded="false" aria-label="Ouvrir le menu">
          <!-- Icône hamburger SVG -->
        </button>
        <ul class="nav-links" role="list">
          <li><a href="/produit">Produit</a></li>
          <li><a href="/cas-usage">Cas d'usage</a></li>
          <li><a href="/conformite">Preuve</a></li>
          <li><a href="/pricing">Pricing</a></li>
          <li><a href="/ressources">Ressources</a></li>
        </ul>
        <a href="/contact" class="btn btn-primary btn-sm">Réserver une démo</a>
      </div>
    </nav>
  </header>

  <main id="main" tabindex="-1">

    <!-- Hero -->
    <section aria-labelledby="hero-h1" class="section">
      <div class="container">
        <h1 id="hero-h1" class="text-hero">Voir à travers les cloisons.<br>Finies les erreurs de perçage.</h1>
        <!-- ... -->
      </div>
    </section>

    <!-- Sections suivantes -->
    <section aria-labelledby="problem-h2" class="section section-alt">
      <div class="container">
        <h2 id="problem-h2">Ce qui se passe après le placo coûte cher.</h2>
        <!-- ... -->
      </div>
    </section>

    <!-- ... autres sections ... -->

  </main>

  <footer class="footer" role="contentinfo">
    <!-- ... -->
  </footer>

  <div class="toast" role="status" aria-live="polite"></div>
  <script src="ar-sight-interactions.js" defer></script>
</body>
```

---

## Animations — utilisation

### Scroll reveal (automatique via JS)

```html
<!-- Ajouter la classe .reveal à tout élément à animer à l'entrée -->
<div class="reveal">
  <!-- Contenu — apparaît en fade+slide au scroll -->
</div>

<!-- Stagger sur groupe -->
<div class="stagger">
  <div class="animate-fade-up card">Card 1</div>
  <div class="animate-fade-up card">Card 2</div>
  <div class="animate-fade-up card">Card 3</div>
</div>
```

### Toast manuel

```javascript
// Disponible via window.ARSIGHT.showToast()
ARSIGHT.showToast('Message envoyé avec succès.');
ARSIGHT.showToast('Erreur réseau.', 'error');
```

---

## Checklist intégration rapide

- [ ] CSS `ar-sight-design-system.css` lié dans `<head>`
- [ ] JS `ar-sight-interactions.js` en `defer` en bas de `<body>`
- [ ] `data-form="contact"` sur le formulaire
- [ ] `data-nav-toggle` sur le bouton hamburger
- [ ] `.faq-item` + `.faq-question` + `.faq-answer` sur chaque item FAQ
- [ ] `.reveal` sur les éléments à animer au scroll
- [ ] `data-count` + `data-suffix` sur les stats chiffrées
- [ ] `data-copy` sur le hash display
- [ ] `data-mode-panel` sur les panneaux App/Hub
- [ ] `role="tablist"` + `role="tab"` + `role="tabpanel"` sur le toggle
- [ ] `<link rel="canonical">` sur chaque page
- [ ] Open Graph + Twitter Cards dans `<head>`
- [ ] Schema FAQ JSON-LD dans `<head>` ou `<body>`
- [ ] `loading="lazy"` sur toutes les images sauf le hero
- [ ] `fetchpriority="high"` sur l'image hero
- [ ] `width` et `height` explicites sur toutes les `<img>`
- [ ] Test Lighthouse ≥ 90 avant mise en ligne

---

## Variables Webflow — Mapping

| Token CSS | Nom suggéré Webflow |
|-----------|---------------------|
| `--color-accent` | `Primary Blue` |
| `--color-text-primary` | `Text Primary` |
| `--color-surface-1` | `Surface Gray` |
| `--space-6` | `Padding MD` |
| `--space-24` | `Section Padding` |
| `--radius-xl` | `Card Radius` |
| `--radius-full` | `Button Radius` |
| `--shadow-md` | `Card Shadow` |
| `--transition-base` | `Transition Base` |

---

## Contacts & livrables suivants

**Étapes recommandées post-spec :**

1. **Design Figma** : Transposer les tokens en styles Figma + créer les composants principaux (nav, hero, cards, formulaire, FAQ)
2. **Prototype Figma** : Valider le flow Home → Contact en desktop + mobile
3. **Assets visuels** : Commander les rendus 3D Hub + captures AR stylisées
4. **Intégration** : HTML/CSS/JS ou Webflow selon stack choisie
5. **Contenu final** : Valider les citations, logos partenaires, chiffres
6. **Tests** : Lighthouse, VoiceOver, formulaire réel, RGPD
7. **Mise en ligne** : DNS, HTTPS, sitemap soumis à Google Search Console

---

*AR-SIGHT Spec Site Vitrine v1.0 — Confidentiel*  
*Généré par Claude (Anthropic) — 2025*

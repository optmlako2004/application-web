// src/data/mockPosts.js
import postImage1 from "../assets/post-image-1.jpg";
import postImage2 from "../assets/post-image-2.jpg";
import postImage3 from "../assets/post-image-3.jpg";

export const mockPosts = [
  {
    id: 1,
    slug: "pourquoi-les-food-trucks-sont-a-la-mode",
    title: "Pourquoi les Food Trucks sont plus populaires que jamais",
    author: "Alice Martin",
    date: "10 septembre 2025",
    image: postImage1,
    excerpt:
      "Découvrez les raisons du succès fulgurant de la street-food et comment les food trucks ont révolutionné notre façon de déjeuner...",
    content: `
      <p>Il est midi, vous sortez du bureau ou vous vous baladez en ville, et l'envie d'un repas rapide mais savoureux se fait sentir. Il y a quelques années, les options se limitaient souvent aux fast-foods traditionnels. Aujourd'hui, un univers de saveurs s'offre à vous, garé juste au coin de la rue. Les food trucks ont envahi nos villes, transformant le déjeuner sur le pouce en une véritable aventure culinaire. Mais qu'est-ce qui explique ce succès fulgurant ?</p>
      
      <h3>Une Révolution Culinaire sur Roues</h3>
      <p>L'une des principales raisons de la popularité des food trucks est la qualité et la diversité de l'offre. Loin de l'image du simple camion à frites, les entrepreneurs de la street-food moderne proposent des plats créatifs, souvent élaborés avec des produits frais et locaux. Burgers gourmets, spécialités asiatiques, plats végétariens innovants, crêpes bretonnes authentiques... Il y en a pour tous les goûts. Cette montée en gamme a permis de séduire une clientèle de plus en plus exigeante, à la recherche d'une alternative de qualité aux restaurants traditionnels.</p>

      <h3>Un Tremplin pour les Nouveaux Chefs</h3>
      <p>Lancer un restaurant est un investissement colossal. Le food truck représente une porte d'entrée bien plus accessible pour les jeunes chefs et les entrepreneurs passionnés de cuisine. Avec un coût de démarrage réduit, il leur permet de tester leur concept, de se créer une clientèle et de faire leurs preuves sans prendre de risques financiers démesurés. Pour en savoir plus sur les étapes de création, des guides complets comme celui de <strong><a href="https://bpifrance-creation.fr/encyclopedie/secteurs-dactivite/restauration-hotellerie-tourisme/restauration-rapide/ouvrir-food-truck" target="_blank" rel="noopener noreferrer">Bpifrance Création</a></strong> sont une ressource inestimable pour les futurs restaurateurs nomades.</p>

      <h3>Plus qu'un Repas, une Expérience</h3>
      <p>Le food truck, c'est aussi une expérience sociale. On commande directement au chef, on discute avec lui, on mange en plein air... Cette proximité crée un lien unique, loin de l'ambiance parfois formelle d'un restaurant. Les rassemblements de food trucks et les festivals dédiés à la street-food sont devenus des événements populaires, où la convivialité est aussi importante que la nourriture. Des organisations comme <strong><a href="https://www.streetfoodenmouvement.fr/" target="_blank" rel="noopener noreferrer">Street Food en Mouvement</a></strong> œuvrent d'ailleurs à promouvoir cette culture et à fédérer les acteurs du secteur en France.</p>
      
      <h3>L'Avenir est Nomade</h3>
      <p>Flexibilité, qualité, diversité et convivialité : voilà les ingrédients du succès des food trucks. Ils répondent parfaitement aux nouvelles habitudes de consommation et à notre désir de manger bien, même quand le temps presse. Et avec des innovations comme le click & collect qui se développent, l'avenir de la restauration mobile semble plus prometteur que jamais. La prochaine fois que vous aurez une petite faim, levez les yeux : votre prochain coup de cœur culinaire est peut-être juste au bout de la rue.</p>
    `,
  },
  {
    id: 2,
    slug: "top-5-specialites-street-food",
    title: "Le Top 5 des spécialités à tester absolument",
    author: "Julien Lambert",
    date: "5 septembre 2025",
    image: postImage2,
    excerpt:
      "Du burger gourmet au pad thaï, nous avons sélectionné pour vous les incontournables de la cuisine de rue à ne pas manquer...",
    content: `
      <p>L'univers de la street-food est un terrain de jeu infini pour les gourmands. Chaque camion offre une fenêtre sur une culture, une saveur, une histoire. Face à cette diversité, que choisir ? Pour vous guider, nous avons parcouru les rues et sélectionné 5 spécialités incontournables qui font le succès de la cuisine nomade.</p>

      <h3>1. Le Burger Gourmet</h3>
      <p>Oubliez tout ce que vous savez sur les burgers de fast-food. Le burger gourmet de food truck est une œuvre d'art : pain artisanal, viande de boucher, fromages AOP, sauces maison et ingrédients frais. C'est le classique réinventé, un plaisir régressif qui met tout le monde d'accord.</p>
      
      <h3>2. La Poutine Québécoise</h3>
      <p>Venue tout droit du Québec, la poutine a conquis le cœur (et l'estomac) des Français. Des frites maison croustillantes, du fromage en grains qui fait "skouik-skouik" et une sauce brune chaude et onctueuse. C'est le plat réconfortant par excellence, simple, généreux et terriblement addictif.</p>

      <h3>3. Les Tacos Mexicains Authentiques</h3>
      <p>Pas les versions rigides que l'on trouve en supermarché, mais de vraies tortillas de maïs souples, garnies de viandes marinées (comme le fameux "al pastor"), de coriandre fraîche, d'oignons et d'un trait de jus de citron vert. Chaque bouchée est une explosion de saveurs. Pour une immersion dans la culture de la street-food, le site <strong><a href="https://www.lefoodmarket.fr/" target="_blank" rel="noopener noreferrer">Le Food Market</a></strong>, un grand marché-cantine à Paris, est une excellente source d'inspiration.</p>

      <h3>4. Le Pad Thaï</h3>
      <p>Ce plat emblématique de la Thaïlande est un incontournable des food trucks asiatiques. Des nouilles de riz sautées avec des crevettes ou du poulet, des pousses de soja, des cacahuètes et une sauce aigre-douce inimitable. C'est un plat complet, sain et plein de saveurs qui fait voyager les papilles.</p>

      <h3>5. La Crêpe Bretonne (Salée ou Sucrée)</h3>
      <p>Un classique français qui se prête merveilleusement bien à la vente nomade. De la galette complète (jambon, œuf, fromage) à la crêpe au caramel beurre salé, c'est une valeur sûre qui plaît aux petits comme aux grands. Simple, rapide et délicieux.</p>
    `,
  },
  {
    id: 3,
    slug: "lancer-son-food-truck-les-etapes-cles",
    title: "Lancer son propre Food Truck : Les étapes clés",
    author: "Alice Martin",
    date: "1 septembre 2025",
    image: postImage3,
    excerpt:
      "Vous rêvez de vous lancer dans l'aventure de la restauration mobile ? Voici un guide pratique pour vous aider à démarrer sur les chapeaux de roues...",
    content: `
      <p>Le rêve de lancer son propre restaurant est partagé par de nombreux passionnés de cuisine. Mais face aux investissements et aux contraintes d'un local fixe, beaucoup hésitent. Le food truck apparaît alors comme la solution idéale : plus flexible, moins coûteux, il permet de tester son concept et d'aller à la rencontre de sa clientèle. Mais attention, l'aventure demande une préparation rigoureuse. Voici les grandes étapes à ne pas négliger.</p>
      
      <h3>1. Définir son Concept et son Business Plan</h3>
      <p>C'est le point de départ. Quelle cuisine allez-vous proposer ? Quelle sera votre identité visuelle ? Qui sont vos clients cibles ? Un concept fort et un business plan solide sont indispensables pour évaluer la rentabilité de votre projet et convaincre les banques.</p>

      <h3>2. Connaître la Réglementation</h3>
      <p>C'est l'étape la plus complexe. Vous devrez obtenir une carte de commerçant ambulant, suivre une formation en hygiène (HACCP), et choisir un statut juridique pour votre entreprise (auto-entrepreneur, SASU, EURL...). Chaque étape est cruciale et demande de se renseigner précisément. Le site officiel de l'administration française, <strong><a href="https://www.service-public.fr/professionnels-entreprises/vosdroits/F31449" target="_blank" rel="noopener noreferrer">service-public.fr</a></strong>, détaille les autorisations nécessaires pour une activité commerciale ambulante.</p>

      <h3>3. Trouver le Camion et l'Équipement</h3>
      <p>Le camion est votre principal outil de travail. Achat neuf ou d'occasion, aménagement sur-mesure... le budget peut varier considérablement. Il devra respecter les normes de sécurité et d'hygiène en vigueur et être équipé du matériel de cuisine professionnel adapté à votre concept.</p>

      <h3>4. Choisir ses Emplacements et Communiquer</h3>
      <p>L'avantage du food truck, c'est sa mobilité. Mais on ne s'installe pas n'importe où ! Il faut obtenir des autorisations d'emplacement auprès des mairies, viser les marchés, les zones de bureaux ou les événements privés. Une communication active sur les réseaux sociaux est également essentielle pour informer vos clients de vos déplacements et leur donner envie de venir vous voir.</p>
    `,
  },
];

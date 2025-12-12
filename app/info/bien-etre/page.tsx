"use client"

import { Sparkles, Moon, Flower2, Heart, MessageCircle } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const wellnessCategories = [
  {
    id: "relaxation",
    title: "Relaxation",
    icon: Sparkles,
    tips: [
      {
        title: "Respiration Profonde",
        description: "Pratiquez la respiration abdominale pour réduire le stress et oxygéner bébé.",
        steps: [
          "Asseyez-vous confortablement",
          "Inspirez par le nez en gonflant le ventre",
          "Expirez lentement par la bouche",
          "Répétez 5-10 fois",
        ],
      },
      {
        title: "Méditation Guidée",
        description: "La méditation aide à gérer les émotions et à créer un lien avec votre bébé.",
        steps: [
          "Trouvez un endroit calme",
          "Fermez les yeux et concentrez-vous sur votre respiration",
          "Visualisez des images positives",
          "Pratiquez 10-20 minutes par jour",
        ],
      },
      {
        title: "Bain Tiède",
        description: "Un bain relaxant soulage les tensions musculaires et favorise le sommeil.",
        steps: [
          "Eau à température corporelle (37°C maximum)",
          "Ajoutez des huiles essentielles adaptées",
          "Limitez à 15-20 minutes",
          "Évitez l'eau trop chaude",
        ],
      },
    ],
  },
  {
    id: "sommeil",
    title: "Sommeil",
    icon: Moon,
    tips: [
      {
        title: "Position de Sommeil",
        description: "Dormir sur le côté gauche améliore la circulation sanguine vers le placenta.",
        steps: [
          "Utilisez un oreiller entre les jambes",
          "Placez un coussin sous le ventre",
          "Évitez de dormir sur le dos après le 1er trimestre",
          "Changez de position si inconfortable",
        ],
      },
      {
        title: "Routine du Coucher",
        description: "Une routine régulière aide à mieux dormir.",
        steps: [
          "Couchez-vous à heure fixe",
          "Évitez les écrans 1h avant le coucher",
          "Créez une ambiance calme et sombre",
          "Lisez ou écoutez de la musique douce",
        ],
      },
      {
        title: "Gestion de l'Insomnie",
        description: "Des techniques naturelles pour retrouver le sommeil.",
        steps: [
          "Levez-vous si vous ne dormez pas après 20 min",
          "Pratiquez la relaxation musculaire progressive",
          "Évitez les liquides avant le coucher",
          "Consultez si l'insomnie persiste",
        ],
      },
    ],
  },
  {
    id: "emotionnel",
    title: "Bien-être Émotionnel",
    icon: Heart,
    tips: [
      {
        title: "Gestion des Émotions",
        description: "Les hormones peuvent intensifier les émotions. C'est normal.",
        steps: [
          "Acceptez vos émotions sans jugement",
          "Parlez de vos sentiments à votre entourage",
          "Tenez un journal intime",
          "N'hésitez pas à demander de l'aide",
        ],
      },
      {
        title: "Connexion avec Bébé",
        description: "Créez un lien avec votre bébé avant la naissance.",
        steps: [
          "Parlez ou chantez à votre bébé",
          "Massez doucement votre ventre",
          "Écoutez de la musique ensemble",
          "Imaginez votre futur avec bébé",
        ],
      },
      {
        title: "Soutien Social",
        description: "L'entourage joue un rôle essentiel dans votre bien-être.",
        steps: [
          "Rejoignez des groupes de futures mamans",
          "Partagez vos préoccupations",
          "Acceptez l'aide proposée",
          "Restez en contact avec vos proches",
        ],
      },
    ],
  },
  {
    id: "beaute",
    title: "Beauté & Soins",
    icon: Flower2,
    tips: [
      {
        title: "Soins de la Peau",
        description: "Prévenez les vergetures et prenez soin de votre peau.",
        steps: [
          "Hydratez quotidiennement avec une crème adaptée",
          "Massez en mouvements circulaires",
          "Buvez beaucoup d'eau",
          "Protégez-vous du soleil (masque de grossesse)",
        ],
      },
      {
        title: "Soins du Corps",
        description: "Prenez du temps pour vous chouchouter.",
        steps: [
          "Exfoliez doucement 1-2 fois par semaine",
          "Massez vos jambes pour la circulation",
          "Hydratez pieds et mains",
          "Portez des vêtements confortables",
        ],
      },
      {
        title: "Cheveux et Ongles",
        description: "Les hormones peuvent affecter vos cheveux et ongles.",
        steps: [
          "Utilisez des produits doux et naturels",
          "Évitez les colorations chimiques",
          "Coupez régulièrement les ongles",
          "Hydratez les cuticules",
        ],
      },
    ],
  },
]

export default function BienEtrePage() {
  return (
    <div className="min-h-screen pb-24 bg-gradient-to-b from-background to-secondary/20">
      <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 p-6 border-b">
        <h1 className="text-3xl font-bold text-foreground text-balance">Bien-être</h1>
        <p className="text-muted-foreground mt-2 text-pretty">Prenez soin de vous pour une grossesse sereine</p>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <Tabs defaultValue="relaxation" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 h-auto gap-2 bg-transparent">
            {wellnessCategories.map((category) => {
              const Icon = category.icon
              return (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-accent data-[state=active]:text-primary-foreground flex items-center gap-2 py-3"
                >
                  <Icon className="h-4 w-4" />
                  <span className="text-sm">{category.title}</span>
                </TabsTrigger>
              )
            })}
          </TabsList>

          {wellnessCategories.map((category) => (
            <TabsContent key={category.id} value={category.id} className="space-y-4">
              {category.tips.map((tip, idx) => (
                <div
                  key={idx}
                  className="bg-gradient-to-br from-card to-card/50 border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <h3 className="text-xl font-semibold text-foreground mb-2 text-balance">{tip.title}</h3>
                  <p className="text-muted-foreground mb-4 text-pretty">{tip.description}</p>

                  <div className="space-y-2">
                    {tip.steps.map((step, stepIdx) => (
                      <div key={stepIdx} className="flex gap-3 items-start">
                        <div className="h-6 w-6 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
                          <span className="text-xs font-medium text-primary-foreground">{stepIdx + 1}</span>
                        </div>
                        <p className="text-muted-foreground text-sm text-pretty pt-0.5">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </TabsContent>
          ))}
        </Tabs>

        {/* Support Section */}
        <div className="mt-8 bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/20 rounded-xl p-6">
          <div className="flex items-start gap-4">
            <MessageCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-foreground mb-2">Besoin de parler?</h3>
              <p className="text-sm text-muted-foreground text-pretty mb-4">
                Si vous ressentez une anxiété persistante, des symptômes dépressifs ou un mal-être important, n'hésitez
                pas à en parler à votre sage-femme ou médecin. Un soutien psychologique est disponible.
              </p>
              <div className="space-y-1 text-sm">
                <p className="text-muted-foreground">
                  <span className="font-medium text-foreground">Ligne d'écoute:</span> 0800 00 34 56 (gratuit)
                </p>
                <p className="text-muted-foreground">
                  <span className="font-medium text-foreground">Disponible:</span> 7j/7, 24h/24
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

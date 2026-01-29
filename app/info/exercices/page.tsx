"use client"

import { useState } from "react"
import { Activity, Heart, Droplets, Brain, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const exercises = [
  {
    id: 1,
    name: "Exercices de Kegel",
    category: "Périnée",
    trimester: ["1er", "2ème", "3ème"],
    duration: "5-10 min",
    icon: Activity,
    description: "Renforcez votre plancher pelvien pour prévenir les fuites urinaires et faciliter l'accouchement.",
    steps: [
      "Asseyez-vous confortablement ou allongez-vous",
      "Contractez les muscles du périnée comme pour retenir l'urine",
      "Maintenez 5 secondes, relâchez 5 secondes",
      "Répétez 10 fois, 3 fois par jour",
    ],
    benefits: ["Prévient l'incontinence", "Facilite l'accouchement", "Améliore la récupération post-partum"],
  },
  {
    id: 2,
    name: "Marche Douce",
    category: "Cardio",
    trimester: ["1er", "2ème", "3ème"],
    duration: "20-30 min",
    icon: Heart,
    description: "Activité physique douce et sûre tout au long de la grossesse.",
    steps: [
      "Portez des chaussures confortables",
      "Commencez lentement et augmentez progressivement",
      "Restez hydratée",
      "Arrêtez si vous ressentez des douleurs",
    ],
    benefits: ["Améliore la circulation", "Réduit le stress", "Maintient la forme"],
  },
  {
    id: 3,
    name: "Natation Prénatale",
    category: "Cardio",
    trimester: ["2ème", "3ème"],
    duration: "30 min",
    icon: Droplets,
    description: "Exercice complet sans impact sur les articulations.",
    steps: [
      "Choisissez une piscine chauffée",
      "Privilégiez la nage sur le dos ou la brasse",
      "Évitez les plongeons",
      "Nagez à votre rythme",
    ],
    benefits: ["Soulage le poids du ventre", "Tonifie les muscles", "Réduit les œdèmes"],
  },
  {
    id: 4,
    name: "Yoga Prénatal",
    category: "Relaxation",
    trimester: ["1er", "2ème", "3ème"],
    duration: "30-45 min",
    icon: Brain,
    description: "Postures adaptées pour la flexibilité et la détente.",
    steps: [
      "Évitez les postures sur le ventre",
      "Utilisez des coussins pour le confort",
      "Concentrez-vous sur la respiration",
      "Adaptez selon votre niveau",
    ],
    benefits: ["Améliore la flexibilité", "Réduit le stress", "Prépare à l'accouchement"],
  },
  {
    id: 5,
    name: "Étirements Doux",
    category: "Souplesse",
    trimester: ["1er", "2ème", "3ème"],
    duration: "10-15 min",
    icon: Activity,
    description: "Soulage les tensions musculaires et améliore la mobilité.",
    steps: [
      "Étirez-vous après un léger échauffement",
      "Ne forcez jamais un étirement",
      "Respirez profondément",
      "Maintenez chaque position 20-30 secondes",
    ],
    benefits: ["Réduit les douleurs dorsales", "Améliore la posture", "Favorise la relaxation"],
  },
]

export default function ExercicesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTrimester, setSelectedTrimester] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const categories = Array.from(new Set(exercises.map((e) => e.category)))
  const trimesters = ["1er", "2ème", "3ème"]

  const filteredExercises = exercises.filter((exercise) => {
    const matchesSearch =
      exercise.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exercise.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesTrimester = !selectedTrimester || exercise.trimester.includes(selectedTrimester)
    const matchesCategory = !selectedCategory || exercise.category === selectedCategory
    return matchesSearch && matchesTrimester && matchesCategory
  })

  return (
    <div className="min-h-screen pb-24 bg-gradient-to-b from-background to-secondary/20">
      <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 p-6 border-b">
        <h1 className="text-3xl font-bold text-foreground text-balance">Exercices Prénataux</h1>
        <p className="text-muted-foreground mt-2 text-pretty">Restez active et en forme pendant votre grossesse</p>
      </div>

      <main id="main-content" className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Rechercher un exercice..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-12"
            aria-label="Rechercher un exercice"
          />
        </div>

        {/* Filters */}
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            <span className="text-sm font-medium text-muted-foreground self-center">Trimestre:</span>
            {trimesters.map((trimester) => (
              <Badge
                key={trimester}
                variant={selectedTrimester === trimester ? "default" : "outline"}
                className="cursor-pointer transition-all hover:scale-105"
                onClick={() => setSelectedTrimester(selectedTrimester === trimester ? null : trimester)}
              >
                {trimester}
              </Badge>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="text-sm font-medium text-muted-foreground self-center">Catégorie:</span>
            {categories.map((category) => (
              <Badge
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className="cursor-pointer transition-all hover:scale-105"
                onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>

        {/* Exercises List */}
        <div className="space-y-4">
          {filteredExercises.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Activity className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Aucun exercice trouvé</p>
            </div>
          ) : (
            <Accordion type="single" collapsible className="space-y-4">
              {filteredExercises.map((exercise) => {
                const Icon = exercise.icon
                return (
                  <AccordionItem
                    key={exercise.id}
                    value={exercise.id.toString()}
                    className="bg-gradient-to-br from-card to-card/50 border rounded-xl shadow-sm overflow-hidden"
                  >
                    <AccordionTrigger className="px-6 py-4 hover:no-underline group">
                      <div className="flex items-start gap-4 text-left w-full">
                        <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                          <Icon className="h-6 w-6 text-primary-foreground" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-lg text-foreground text-balance">{exercise.name}</h3>
                          <div className="flex flex-wrap gap-2 mt-2">
                            <Badge variant="secondary">{exercise.category}</Badge>
                            <Badge variant="outline">{exercise.duration}</Badge>
                            {exercise.trimester.map((t) => (
                              <Badge key={t} variant="outline" className="text-xs">
                                {t}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6 space-y-4">
                      <p className="text-muted-foreground text-pretty">{exercise.description}</p>

                      <div>
                        <h4 className="font-semibold mb-2 text-foreground">Étapes:</h4>
                        <ol className="space-y-2">
                          {exercise.steps.map((step, idx) => (
                            <li key={idx} className="flex gap-3">
                              <span className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-sm font-medium text-primary">
                                {idx + 1}
                              </span>
                              <span className="text-muted-foreground text-pretty">{step}</span>
                            </li>
                          ))}
                        </ol>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2 text-foreground">Bénéfices:</h4>
                        <ul className="space-y-1">
                          {exercise.benefits.map((benefit, idx) => (
                            <li key={idx} className="flex items-center gap-2">
                              <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                              <span className="text-muted-foreground text-pretty">{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                )
              })}
            </Accordion>
          )}
        </div>

        {/* Safety Note */}
        <div className="bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/20 rounded-xl p-6">
          <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
            <Heart className="h-5 w-5 text-primary" />
            Important
          </h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex gap-2">
              <span>•</span>
              <span className="text-pretty">
                Consultez toujours votre médecin avant de commencer un nouveau programme d'exercices
              </span>
            </li>
            <li className="flex gap-2">
              <span>•</span>
              <span className="text-pretty">
                Arrêtez immédiatement si vous ressentez des douleurs, vertiges ou essoufflement
              </span>
            </li>
            <li className="flex gap-2">
              <span>•</span>
              <span className="text-pretty">Évitez les exercices à risque de chute ou d'impact abdominal</span>
            </li>
            <li className="flex gap-2">
              <span>•</span>
              <span className="text-pretty">Restez hydratée et évitez la surchauffe</span>
            </li>
          </ul>
        </div>
      </main>
    </div>
  )
}

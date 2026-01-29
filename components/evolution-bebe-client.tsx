"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronLeft, ChevronRight, Baby, Ruler, Weight } from "lucide-react"
import { getWeekData } from "@/lib/pregnancy-data"

type Props = {
    initialWeek: number
}

export function EvolutionBebeClient({ initialWeek }: Props) {
    const [currentWeekNum, setCurrentWeekNum] = useState(initialWeek)
    const currentWeek = getWeekData(currentWeekNum)

    const previousWeek = () => {
        if (currentWeekNum > 4) {
            setCurrentWeekNum(currentWeekNum - 1)
        }
    }

    const nextWeek = () => {
        if (currentWeekNum < 42) {
            setCurrentWeekNum(currentWeekNum + 1)
        }
    }

    return (
        <>
            <section id="main-content">
                <h1 className="text-3xl font-bold text-foreground mb-2 text-balance">Évolution de bébé</h1>
                <p className="text-muted-foreground text-pretty">
                    Découvrez le développement de votre bébé semaine après semaine.
                </p>
            </section>

            <Card className="p-6 bg-gradient-to-br from-primary/10 via-tertiary/10 to-secondary/10">
                <div className="flex items-center justify-between mb-4">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={previousWeek}
                        disabled={currentWeekNum <= 4}
                        aria-label="Semaine précédente"
                    >
                        <ChevronLeft className="h-5 w-5" />
                    </Button>
                    <div className="text-center">
                        <p className="text-sm text-muted-foreground mb-1">Trimestre {currentWeek.trimester}</p>
                        <p className="text-3xl font-bold text-foreground">Semaine {currentWeek.week}</p>
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={nextWeek}
                        disabled={currentWeekNum >= 42}
                        aria-label="Semaine suivante"
                    >
                        <ChevronRight className="h-5 w-5" />
                    </Button>
                </div>

                <div className="flex justify-center mb-6">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary to-tertiary animate-float">
                        <Baby className="h-10 w-10 text-white" />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <Card className="p-4 text-center bg-background/80 backdrop-blur-sm">
                        <Ruler className="h-6 w-6 mx-auto mb-2 text-primary" />
                        <p className="text-2xl font-bold text-foreground">{currentWeek.size}</p>
                        <p className="text-xs text-muted-foreground mt-1">Taille</p>
                    </Card>
                    <Card className="p-4 text-center bg-background/80 backdrop-blur-sm">
                        <Weight className="h-6 w-6 mx-auto mb-2 text-primary" />
                        <p className="text-2xl font-bold text-foreground">{currentWeek.weight}</p>
                        <p className="text-xs text-muted-foreground mt-1">Poids</p>
                    </Card>
                </div>

                <Card className="p-4 mt-4 bg-white/50 dark:bg-black/20 backdrop-blur-sm">
                    <p className="text-sm text-muted-foreground text-center">
                        Taille d'un(e) <strong className="text-foreground">{currentWeek.fruit}</strong>
                    </p>
                </Card>
            </Card>

            <Tabs defaultValue="developpement">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="developpement">Développement</TabsTrigger>
                    <TabsTrigger value="conseils">Conseils</TabsTrigger>
                </TabsList>

                <TabsContent value="developpement" className="mt-6">
                    <Card className="p-6">
                        <h2 className="text-lg font-semibold mb-3">Cette semaine</h2>
                        <p className="text-muted-foreground text-pretty leading-relaxed">{currentWeek.development}</p>
                    </Card>
                </TabsContent>

                <TabsContent value="conseils" className="mt-6">
                    <Card className="p-6">
                        <h2 className="text-lg font-semibold mb-3">Conseils pour vous</h2>
                        <p className="text-muted-foreground text-pretty leading-relaxed">{currentWeek.tips}</p>
                    </Card>
                </TabsContent>
            </Tabs>
        </>
    )
}

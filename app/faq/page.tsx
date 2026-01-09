"use client"

import { Header } from "@/components/header"
import { Card } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { HelpCircle, Baby, Apple, Activity, Heart, FileText } from "lucide-react"

const faqCategories = [
	{
		id: "grossesse",
		name: "Questions sur la grossesse",
		icon: Baby,
		questions: [
			{
				q: "Quand vais-je sentir mon bébé bouger ?",
				a: "La plupart des femmes sentent les premiers mouvements de leur bébé entre 18 et 22 semaines de grossesse. Pour une première grossesse, cela peut être un peu plus tard. Les mouvements ressemblent d'abord à des bulles ou des papillons.",
			},
			{
				q: "Combien de poids devrais-je prendre pendant la grossesse ?",
				a: "La prise de poids recommandée dépend de votre IMC de départ. En général, pour un IMC normal, on recommande une prise de 11 à 16 kg. Votre médecin ou sage-femme vous guidera selon votre situation.",
			},
			{
				q: "Quand puis-je connaître le sexe de mon bébé ?",
				a: "Le sexe du bébé peut généralement être déterminé lors de l'échographie morphologique, entre 18 et 22 semaines de grossesse, si le bébé est bien positionné.",
			},
		],
	},
	{
		id: "nutrition",
		name: "Nutrition et alimentation",
		icon: Apple,
		questions: [
			{
				q: "Puis-je manger du fromage pendant la grossesse ?",
				a: "Oui, mais uniquement les fromages à pâte dure et pasteurisés. Évitez les fromages à pâte molle au lait cru (camembert, brie) et les fromages à croûte fleurie en raison du risque de listériose.",
			},
			{
				q: "Combien de café puis-je boire ?",
				a: "Il est recommandé de limiter votre consommation de caféine à 200 mg par jour (environ 2 tasses de café). N'oubliez pas que le thé, le chocolat et certains sodas contiennent aussi de la caféine.",
			},
			{
				q: "Dois-je prendre des compléments alimentaires ?",
				a: "L'acide folique est essentiel dès le début de la grossesse. La vitamine D et le fer peuvent également être recommandés. Consultez votre médecin pour déterminer vos besoins spécifiques.",
			},
		],
	},
	{
		id: "symptomes",
		name: "Symptômes et inconforts",
		icon: Activity,
		questions: [
			{
				q: "Comment soulager les nausées matinales ?",
				a: "Mangez de petites portions fréquemment, évitez les aliments gras et épicés, restez hydratée, et essayez le gingembre. Les nausées s'atténuent généralement après le premier trimestre.",
			},
			{
				q: "Les crampes dans les jambes sont-elles normales ?",
				a: "Oui, les crampes sont fréquentes, surtout au deuxième et troisième trimestre. Étirez-vous régulièrement, hydratez-vous bien et assurez-vous d'avoir suffisamment de magnésium et de calcium dans votre alimentation.",
			},
			{
				q: "Que faire en cas de contractions ?",
				a: "Les contractions de Braxton-Hicks sont normales et irrégulières. Si les contractions deviennent régulières (toutes les 5-10 minutes), intenses et douloureuses, ou si vous perdez du liquide, contactez immédiatement votre maternité.",
			},
		],
	},
	{
		id: "activite",
		name: "Activité physique",
		icon: Heart,
		questions: [
			{
				q: "Puis-je faire du sport pendant la grossesse ?",
				a: "Oui, l'activité physique modérée est recommandée pendant la grossesse. La marche, la natation, le yoga prénatal et les exercices doux sont excellents. Évitez les sports de contact et les activités à risque de chute.",
			},
			{
				q: "Quels exercices sont les plus sûrs ?",
				a: "La marche, la natation, le yoga prénatal, le Pilates adapté et le vélo stationnaire sont généralement sûrs. Écoutez votre corps et arrêtez si vous ressentez des douleurs ou un essoufflement important.",
			},
			{
				q: "Dois-je éviter de porter des charges lourdes ?",
				a: "Oui, évitez de soulever des objets lourds, surtout au troisième trimestre. Si vous devez soulever quelque chose, pliez les genoux plutôt que de vous pencher en avant.",
			},
		],
	},
	{
		id: "preparation",
		name: "Préparation à l'accouchement",
		icon: FileText,
		questions: [
			{
				q: "Quand dois-je préparer ma valise de maternité ?",
				a: "Il est recommandé de préparer votre valise vers 32-34 semaines de grossesse, au cas où bébé arriverait plus tôt que prévu. Utilisez notre checklist trousseau pour ne rien oublier.",
			},
			{
				q: "Qu'est-ce qu'un projet de naissance ?",
				a: "Un projet de naissance est un document où vous exprimez vos souhaits pour l'accouchement (position, gestion de la douleur, présence d'accompagnants). Il se discute avec votre sage-femme ou médecin.",
			},
			{
				q: "Quand partir à la maternité ?",
				a: "Pour une première grossesse, partez quand les contractions sont régulières toutes les 5 minutes pendant 1 heure. Pour les grossesses suivantes, partez plus tôt. En cas de doute, appelez la maternité.",
			},
		],
	},
]

export default function FAQPage() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-secondary/30 via-background to-tertiary/20 pb-20 md:pb-8">
			<Header />

			<main className="container px-4 py-6 space-y-6 max-w-6xl mx-auto">
				<a
					href="#main-content"
					className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-lg"
				>
					Aller au contenu principal
				</a>

				<section id="main-content">
					<div className="flex items-center gap-3 mb-2">
						<HelpCircle className="h-8 w-8 text-primary" />
						<h1 className="text-3xl font-bold text-foreground text-balance">
							Questions fréquentes
						</h1>
					</div>
					<p className="text-muted-foreground text-pretty">
						Trouvez des réponses aux questions les plus courantes sur la grossesse.
					</p>
				</section>

				<Card className="p-4 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
					<p className="text-sm text-muted-foreground text-pretty">
						<strong className="text-foreground">Important:</strong> Ces informations
						sont générales et ne remplacent pas l'avis médical. Consultez toujours votre
						médecin ou sage-femme pour des conseils personnalisés.
					</p>
				</Card>

				<div className="space-y-6">
					{faqCategories.map((category) => {
						const Icon = category.icon
						return (
							<section key={category.id} className="space-y-3">
								<div className="flex items-center gap-3">
									<div className="h-12 w-12 rounded-xl bg-primary/20 flex items-center justify-center">
										<Icon className="h-6 w-6 text-primary" />
									</div>
									<h2 className="text-xl font-bold text-foreground">
										{category.name}
									</h2>
								</div>

								<Accordion type="single" collapsible className="space-y-2">
									{category.questions.map((item, index) => (
										<AccordionItem
											key={index}
											value={`${category.id}-${index}`}
											className="border rounded-xl overflow-hidden bg-card focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 focus-within:ring-offset-background"
										>
											<AccordionTrigger className="px-4 py-4 hover:no-underline hover:bg-accent/50 text-left">
												<span className="font-semibold text-foreground pr-4">
													{item.q}
												</span>
											</AccordionTrigger>
											<AccordionContent className="px-4 pb-4">
												<p className="text-muted-foreground text-pretty leading-relaxed">
													{item.a}
												</p>
											</AccordionContent>
										</AccordionItem>
									))}
								</Accordion>
							</section>
						)
					})}
				</div>

				<Card className="p-6 bg-gradient-to-br from-tertiary/10 to-tertiary/5 border-tertiary/20">
					<h3 className="font-bold text-foreground mb-2">
						Vous ne trouvez pas de réponse ?
					</h3>
					<p className="text-sm text-muted-foreground mb-4">
						N'hésitez pas à contacter votre sage-femme ou votre médecin pour toute
						question concernant votre grossesse.
					</p>
				</Card>
			</main>
		</div>
	)
}

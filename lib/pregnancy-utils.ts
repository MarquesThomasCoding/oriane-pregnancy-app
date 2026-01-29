// Durée moyenne d'une grossesse en jours (40 semaines)
const PREGNANCY_DURATION_DAYS = 280

/**
 * Calcule la date de conception à partir du terme prévu
 */
export function calculateConceptionFromDue(dueDate: Date): Date {
    const conception = new Date(dueDate)
    conception.setDate(conception.getDate() - PREGNANCY_DURATION_DAYS)
    return conception
}

/**
 * Calcule le terme prévu à partir de la date de conception
 */
export function calculateDueFromConception(conceptionDate: Date): Date {
    const due = new Date(conceptionDate)
    due.setDate(due.getDate() + PREGNANCY_DURATION_DAYS)
    return due
}

/**
 * Calcule l'avancement de la grossesse
 */
export function calculatePregnancyProgress(pregnancyStart: Date | null, pregnancyDue: Date | null) {
    if (!pregnancyStart && !pregnancyDue) {
        return null
    }

    const now = new Date()
    let startDate: Date
    let endDate: Date

    if (pregnancyStart && pregnancyDue) {
        startDate = new Date(pregnancyStart)
        endDate = new Date(pregnancyDue)
    } else if (pregnancyDue) {
        endDate = new Date(pregnancyDue)
        startDate = calculateConceptionFromDue(endDate)
    } else if (pregnancyStart) {
        startDate = new Date(pregnancyStart)
        endDate = calculateDueFromConception(startDate)
    } else {
        return null
    }

    const totalDays = Math.floor((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
    const daysElapsed = Math.floor((now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
    const daysRemaining = Math.max(0, Math.floor((endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)))

    const weeksElapsed = Math.floor(daysElapsed / 7)
    const daysInCurrentWeek = daysElapsed % 7

    // Calcul du trimestre (semaines 1-13: T1, 14-26: T2, 27-40: T3)
    let trimester = 1
    if (weeksElapsed >= 27) {
        trimester = 3
    } else if (weeksElapsed >= 14) {
        trimester = 2
    }

    return {
        startDate,
        endDate,
        totalDays,
        daysElapsed,
        daysRemaining,
        weeksElapsed: Math.min(weeksElapsed, 42), // Cap à 42 semaines
        daysInCurrentWeek,
        trimester,
        progressPercent: Math.min(100, Math.round((daysElapsed / totalDays) * 100)),
    }
}

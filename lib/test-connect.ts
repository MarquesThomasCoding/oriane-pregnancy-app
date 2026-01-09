// lib/test-connect.ts
import { config } from 'dotenv'
import { resolve } from 'path'
import { PrismaClient } from '@prisma/client'

// Charger le .env depuis la racine
config({ path: resolve(__dirname, '../.env') })

const directUrl = process.env.DIRECT_URL

if (!directUrl) {
  console.error('❌ DIRECT_URL n\'est pas défini dans .env')
  process.exit(1)
}

// Afficher l'URL sans le mot de passe pour debug
const urlForDisplay = directUrl.replace(/:[^:@]+@/, ':****@')
console.log('🔍 URL de connexion:', urlForDisplay)
console.log('🔍 Host:', directUrl.split('@')[1]?.split(':')[0])
console.log('🔍 Port:', directUrl.split(':')[3]?.split('/')[0])
console.log('🔍 SSL mode:', directUrl.includes('sslmode') ? 'Oui' : 'Non')

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: directUrl
    }
  },
  log: ['error', 'warn']
})

async function test() {
  try {
    console.log('\n🔄 Tentative de connexion...')
    await prisma.$connect()
    console.log('✅ Connexion réussie!')
    
    const result = await prisma.$queryRaw`SELECT 1 as test, version() as pg_version`
    console.log('✅ Test query réussie:', result)
    
    // Test de création de table (vérifier les permissions)
    const tableCount = await prisma.$queryRaw<Array<{count: bigint}>>`
      SELECT COUNT(*) as count 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `
    console.log('✅ Tables dans public schema:', Number(tableCount[0].count))
    
  } catch (error: any) {
    console.error('\n❌ Erreur de connexion:')
    console.error('Message:', error.message)
    console.error('Code:', error.code)
    
    if (error.code === 'P1001') {
      console.error('\n💡 Solutions possibles:')
      console.error('1. Vérifiez que votre .env contient ?sslmode=require')
      console.error('2. Vérifiez votre mot de passe (pas d\'espaces, caractères spéciaux encodés)')
      console.error('3. Testez la connectivité: ping db.mptfpsebslyjjzshpkux.supabase.co')
      console.error('4. Vérifiez les restrictions réseau dans Supabase Dashboard')
    } else if (error.code === 'P1000') {
      console.error('\n💡 Problème d\'authentification - vérifiez votre mot de passe')
    }
  } finally {
    await prisma.$disconnect()
  }
}

test()
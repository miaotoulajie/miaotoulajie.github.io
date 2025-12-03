// scripts/check-env.js
const requiredVars = [
  'VITE_SUPABASE_URL',
  'VITE_SUPABASE_ANON_KEY'
];

let missingVars = [];

requiredVars.forEach(varName => {
  if (!process.env[varName]) {
    missingVars.push(varName);
  }
});

if (missingVars.length > 0) {
  console.error('❌ Missing environment variables:', missingVars);
  console.log('请确保在 Vercel 中配置以下变量：');
  missingVars.forEach(varName => {
    console.log(`- ${varName}`);
  });
  process.exit(1);
} else {
  console.log('✅ 所有环境变量已配置');
}
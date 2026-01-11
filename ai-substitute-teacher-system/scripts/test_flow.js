async function run(){
  const fetch = global.fetch ? global.fetch : (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

  try{
    // Login as student
    const login = await fetch('http://localhost:4000/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: 'student1', password: 'studentpass' })
    });
    const loginJson = await login.json();
    console.log('LOGIN:', loginJson);

    const token = loginJson.token;
    // Submit a basic question that should match FAQ
    const q1 = await fetch('http://localhost:4000/questions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ questionText: 'What is a variable?' })
    });
    const q1j = await q1.json();
    console.log('Q1:', q1j);

    // Submit a complex question
    const q2 = await fetch('http://localhost:4000/questions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ questionText: 'Explain how closures work in JavaScript with an example.' })
    });
    const q2j = await q2.json();
    console.log('Q2:', q2j);

    // Submit a hard question
    const q3 = await fetch('http://localhost:4000/questions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ questionText: 'Prove the Riemann hypothesis.' })
    });
    const q3j = await q3.json();
    console.log('Q3:', q3j);

  }catch(e){
    console.error('Error during test flow', e);
    process.exit(1);
  }
}

run();

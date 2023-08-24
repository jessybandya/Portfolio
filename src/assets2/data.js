const pharmacies = [
    { name: 'Pharmacy A', location: [51.505, -0.09] },
    { name: 'Pharmacy B', location: [51.51, -0.1] },
    { name: 'Pharmacy C', location: [51.515, -0.11] },
    { name: 'Pharmacy D', location: [51.52, -0.12] },
  ];

  const diseases = [
    {
      name: 'Common Cold',
      symptoms: ['Runny nose','Chills', 'Body aches', 'Cough'],
      recommendedMedicines: ['Paracetamol', 'Ibuprofen'],
      pharmacy: { name: 'Pharmacy A', location: [51.505, -0.09] },
      price: 'Ksh.350',
      preventation:"Do not take too much of cold drinks."
    },
    {
      name: 'Flu',
      symptoms: ['Fever', 'Chills', 'Body aches', 'Cough'],
      recommendedMedicines: ['Paracetamol', 'Ibuprofen'],
      pharmacy: { name: 'Pharmacy B', location: [51.51, -0.1] },
      price: 'Ksh.350',
      preventation:"Do not take too much of cold drinks."
    },
    {
      name: 'COVID-19',
      symptoms: ['Fever', 'Cough', 'Shortness of breath', 'Fatigue'],
      recommendedMedicines: ['Paracetamol', 'Ibuprofen'],
      pharmacy: { name: 'Pharmacy C', location: [51.515, -0.11] },
      price: 'Ksh.350',
      preventation:"Do not take too much of cold drinks."
    },
    {
      name: 'Allergies',
      symptoms: ['Sneezing', 'Runny or stuffy nose', 'Itchy or watery eyes', 'Cough'],
      recommendedMedicines: ['Paracetamol', 'Ibuprofen'],
      pharmacy: { name: 'Pharmacy D', location: [51.52, -0.12] },
      price: 'Ksh.350',
      preventation:"Do not take too much of cold drinks."
    },
    {
      name: 'Migraine',
      symptoms: ['Intense headache', 'Sensitivity to light or sound', 'Nausea or vomiting', 'Visual disturbances (aura)'],
      recommendedMedicines: ['Paracetamol', 'Ibuprofen'],
      pharmacy: { name: 'Pharmacy A', location: [51.505, -0.09] },
      price: 'Ksh.350',
      preventation:"Do not take too much of cold drinks."
    },
    {
      name: 'Gastroenteritis (Stomach Flu)',
      symptoms: ['Nausea', 'Vomiting', 'Diarrhea', 'Stomach cramps'],
      recommendedMedicines: ['Paracetamol', 'Ibuprofen'],
      pharmacy: { name: 'Pharmacy B', location: [51.51, -0.1] },
      price: 'Ksh.350',
      preventation:"Do not take too much of cold drinks."
    },
  ];

  export {pharmacies, diseases}
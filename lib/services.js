export const services = [
    {
        id: 'baby-care',
        name: 'Baby Care Service',
        title: 'Professional Baby Sitting',
        description: 'Experienced and certified caretakers for your little ones',
        fullDescription: 'Our baby care service provides professional, trained, and background-verified caretakers who specialize in infant and toddler care. Services include feeding, diaper changing, playtime activities, sleep routines, and basic first aid.',
        price: 500, // per day in BDT
        hourlyPrice: 50, // per hour in BDT
        image: '/images/baby-care.jpg',
        icon: '👶',
        features: [
            'Certified and trained caretakers',
            'Background verification completed',
            'Flexible hourly or daily booking',
            'Emergency contact support',
            'Activity and meal planning',
            'Regular progress updates'
        ],
        ageRange: '0-5 years',
        availability: '24/7'
    },
    {
        id: 'elderly-care',
        name: 'Elderly Care Service',
        title: 'Compassionate Elderly Care',
        description: 'Trusted caregivers for your elderly family members',
        fullDescription: 'Our elderly care service offers compassionate and professional support for senior citizens. Our trained caregivers assist with daily activities, medication reminders, companionship, mobility support, and ensuring comfort and dignity.',
        price: 600, // per day in BDT
        hourlyPrice: 60, // per hour in BDT
        image: '/images/elderly-care.jpg',
        icon: '👴',
        features: [
            'Experienced elderly care specialists',
            'Medication management',
            'Mobility and exercise assistance',
            'Companionship and emotional support',
            'Meal preparation and feeding',
            'Personal hygiene assistance'
        ],
        ageRange: '60+ years',
        availability: '24/7'
    },
    {
        id: 'sick-care',
        name: 'Sick People Service',
        title: 'Medical Care Support',
        description: 'Specialized care for patients recovering at home',
        fullDescription: 'Our sick people care service provides trained medical assistants and caregivers for patients recovering from illness or surgery. Services include medication administration, vital signs monitoring, wound care, and assistance with daily needs.',
        price: 700, // per day in BDT
        hourlyPrice: 70, // per hour in BDT
        image: '/images/sick-care.jpg',
        icon: '🏥',
        features: [
            'Medical assistant support',
            'Vital signs monitoring',
            'Medication administration',
            'Post-surgery care',
            'Physical therapy assistance',
            '24/7 emergency support'
        ],
        ageRange: 'All ages',
        availability: '24/7'
    }
];

export const divisions = [
    'Dhaka',
    'Chittagong',
    'Rajshahi',
    'Khulna',
    'Barisal',
    'Sylhet',
    'Rangpur',
    'Mymensingh'
];

export const districts = {
    'Dhaka': ['Dhaka', 'Gazipur', 'Narayanganj', 'Tangail', 'Munshiganj'],
    'Chittagong': ['Chittagong', 'Cox\'s Bazar', 'Comilla', 'Feni'],
    'Rajshahi': ['Rajshahi', 'Bogra', 'Pabna', 'Sirajganj'],
    'Khulna': ['Khulna', 'Jessore', 'Satkhira', 'Bagerhat'],
    'Barisal': ['Barisal', 'Patuakhali', 'Bhola', 'Pirojpur'],
    'Sylhet': ['Sylhet', 'Moulvibazar', 'Habiganj', 'Sunamganj'],
    'Rangpur': ['Rangpur', 'Dinajpur', 'Kurigram', 'Nilphamari'],
    'Mymensingh': ['Mymensingh', 'Jamalpur', 'Netrokona', 'Sherpur']
};

export function getServiceById(id) {
    return services.find(service => service.id === id);
}

export function calculateTotalCost(serviceId, duration, durationType) {
    const service = getServiceById(serviceId);
    if (!service) return 0;

    if (durationType === 'hours') {
        return service.hourlyPrice * duration;
    } else {
        return service.price * duration;
    }
}
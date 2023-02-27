export const contract_terms = [
    { value: 'renew', label: 'The contract shall be automatically renewed.' },
    { value: 'non_renew', label: 'The contract is not renewable/fixed.' },
    {
        value: 'renew_by_performance',
        label: `Renewal of contract shall be determined by volume of work to be done at the time the term of
    the contract expires, worker’s work record and work attitude, worker’s capability, business
    performance of the company.`
    }
];

export const work_bonus_salary_increase = [
    { value: 'once', label: 'Once a Year' },
    { value: 'twice', label: 'Twice a Year' },
    { value: 'performance', label: 'Based on Company/worker performance', disabled: true }
];

export const jlpt_level = ['N5', 'N4', 'N3', 'N2', 'N1'];

export const min_year_exp = ['1', '2', '3', '4', '5'];

export const work_days = [
    'Monday to Friday',
    'Monday to Saturday',
    'Tuesday to Saturday',
    'Wednesday to Sunday',
    'Friday to Wednesday'
];

export const days_off = [
    'Saturday and Sunday',
    'Sunday and Monday',
    'Monday and Tuesday',
    'Tuesday and Wednesday',
    'Wednesday and Thursday',
    'Thursday and Friday',
    'Friday and Saturday'
];

export const utilities = [
    { value: 'free', label: 'Free of Charge' },
    { value: 'monthly_included', label: 'Already included in the monthly rental deduction' },
    { value: 'direct', label: 'Actual cost to be paid directly by the worker' },
    { value: 'actual', label: 'Actual cost shall be deducted' },
    { value: 'monthly_allowancne', label: 'Monthly Allowance' },
    
];

export const housing_accomodation = [
    { value: 'a_deduction', label: 'By Monthly Deduction', group: 'Option A. Company-owned property/dormitory' },
    { value: 'a_free', label: 'Free of charge', group: 'Option A. Company-owned property/dormitory' },

    { value: 'b_allowance', label: 'By Monthly Allowance', group: 'Option B. Rented/leased property *initial set-up to be paid by the employer' },
    { value: 'b_deduction', label: 'By Monthly Deduction', group: 'Option B. Rented/leased property *initial set-up to be paid by the employer' },
    { value: 'b_rental_percent', label: '% of the actual rental will be deducted', group: 'Option B. Rented/leased property *initial set-up to be paid by the employer' },
    { value: 'b_free', label: 'Free of charge', group: 'Option B. Rented/leased property *initial set-up to be paid by the employer' },
]

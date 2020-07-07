import {
  cea2019,
  cia2016,
  crm2017,
  miamiherald,
  poty2016,
} from '../../assets/images/landingPage'
import {
  sally, thomas, carolin, terry, kareem,
} from '../../assets/images/avatar'

const clients = [
  {
    source: cea2019,
    alt: 'cea2019',
    href: '',
  },
  {
    source: miamiherald,
    alt: 'miamiherald',
    href: '',
  },
  {
    source: crm2017,
    alt: 'crm2017',
    href: '',
  },
  {
    source: poty2016,
    alt: 'poty2016',
    href: '',
  },
  {
    source: cia2016,
    alt: 'cia2016',
    href: '',
  },
  {
    source: 'https://www.getapp.com/ext/reviews_widget/v1/dark/fenero-application',
    alt: 'GetApp',
    href: 'https://www.getapp.com/it-communications-software/a/fenero/reviews/',
  },
  {
    source: 'https://assets.capterra.com/badge/54c78f6565f4030db187353d12a99c33.png?v=2112709&p=161183',
    alt: 'N/A',
    href: `https://www.capterra.com/reviews/161183/Fenero?utm_source=vendor&utm_medium=badge&utm_
      campaign=capterra_reviews_badge`,
  },
]

const reviews = [
  {
    name: 'Jennifer Thorne',
    message: `Overall my experience has been great. I have found a solution which is functional, priced well, with
    great customer service. Exactly what I was looking for.`,
    rating: 5,
    image: carolin,
  },
  {
    name: 'Abhishek Verma',
    message: `Per minute billing and easy to set up. User friendly UI, takes just one sys-admin on our end to manage
      the software.`,
    rating: 4,
    image: terry,
  },
  {
    name: 'Bella Martin',
    message: 'It is very easy to use like a, b, c.. Very user friendly. It was easy to use and very affordable.',
    rating: 5,
    mage: kareem,
  },
  {
    name: 'Geraldine Santana',
    message: `Its very user-friendly excelent with the records and to put together all the call center needs you can
      even used it from your mobile device and the support its awesome.`,
    rating: 4,
    image: kareem,
  },
  {
    name: 'Carlo Angelo Pablo',
    message: `The support is awesome! Easy to navigate, has self help knowledge base, real time reporting, easy to
      create stations and users, ...everything!`,
    rating: 5,
    image: thomas,
  },
  {
    name: 'Anthanette Petree',
    message: `I liked the price for the service. Once you become acclimated with the system it because easy to start a
      campaign in no time.`,
    rating: 3,
    image: sally,
  },
]

export { clients, reviews }

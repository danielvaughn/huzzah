'use client'

import { useRouter } from "next/navigation"
import React, { useState } from "react"

const faqs = [
  {
    q: 'Why did you make this?',
    a: 'I like writing code, I don\'t like having to write <i>good</i> code',
  },
  {
    q: 'I\'m sick of hearing about AI',
    a: 'Me too but this seemed like a fun idea',
  },
  {
    q: 'Where\'s all the marketing hype I usually see on a landing page',
    a: 'No',
  },
  {
    q: 'So this isn\'t the Most Advanced Next-Gen Super Editor Ever Made™',
    a: 'No',
  },
  {
    q: 'Can I try it out',
    a: 'It\'s password protected right now since it costs money to use the model',
  },
  {
    q: 'Can I have the password then',
    a: 'No',
  },
]

export default function Home() {
  const [password, setPassword] = useState('')
  const router = useRouter()

  return (
    <main className="p-5 text-slate-800">
      <header className="mb-10">
        <h1 className="mb-1 text-4xl font-semibold leading-none text-orange-400">Huzzah</h1>
        <p className="text-xl font-light text-orange-500">code however the f*#k you want</p>
      </header>

      <section className="mb-5">
        <p>Huzzah is the laziest editor imaginable - write pseudocode and let AI generate the equivalent in any language.</p>
        <p>Made for only the most lackluster devs, the absolute bottom of the programming barrel.</p>
      </section>

      <section className="mb-5">
        <dl>
          {faqs.map((faq) => {
            return (
              <React.Fragment key={faq.q}>
                <dt className="mt-2 font-bold">
                  {faq.q}
                </dt>
                <dd dangerouslySetInnerHTML={{__html: faq.a}} />
              </React.Fragment>
            )
          })}
        </dl>
      </section>
      <section>
        <form
          className={`
            bg-gradient-to-br from-orange-300 to-orange-600
            flex w-fit p-1 rounded
          `}
          onSubmit={(e) => {
            e.preventDefault()

            router.push('/editor')
          }}
        >
          <input
            type="text"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
              document.cookie = `hzp=${e.target.value}`
            }}
            placeholder="Enter the password"
            className="pl-1 text-sm rounded-sm outline-none text-slate-800"
          />
          <button
            type="submit"
            href={password === '' ? '' : '/editor'}
            className={`px-3 py-1 text-sm text-white transition-opacity ${password === '' ? 'opacity-40' : 'opacity-100'}`}
          >
            Try it out
          </button>
        </form>
      </section>
    </main>
  )
}

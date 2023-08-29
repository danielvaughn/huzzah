'use client'

import { useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"

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

// THANK YOU NEXTJS WHAT THE FUCK
const pseudoBlock = `
fizzBuzz(count)
  for each i in count
    if divisible by 3, print 'fizz'
    if divisible by 5, print 'buzz'
    if both, print 'fizz buzz'
`

const tsBlock = `
function fizzBuzz(count: number): void {
  for (let i = 1; i <= count; i++) {
      if (i % 3 === 0 && i % 5 === 0) {
          console.log('fizz buzz');
      } else if (i % 3 === 0) {
          console.log('fizz');
      } else if (i % 5 === 0) {
          console.log('buzz');
      }
  }
}
`

const rsBlock = `
fn fizz_buzz(count: i32) {
  for i in 1..=count {
      match (i % 3, i % 5) {
          (0, 0) => println!("fizz buzz"),
          (0, _) => println!("fizz"),
          (_, 0) => println!("buzz"),
          _ => println!("{}", i),
      }
  }
}
`

export default function Home() {
  const [password, setPassword] = useState('')
  const router = useRouter()
  const [renderedPseudoBlock, setRenderedPseudoBlock] = useState('')
  const [renderedTSBlock, setRenderedTSBlock] = useState('')
  const [renderedRsBlock, setRenderedRsBlock] = useState('')

  useEffect(() => {
    setRenderedPseudoBlock(pseudoBlock)
    setRenderedTSBlock(tsBlock)
    setRenderedRsBlock(rsBlock)
  }, [])

  return (
    <main className="max-w-3xl p-5 mx-auto text-slate-800">
      <header className="mb-10">
        <h1 className="mb-1 text-4xl font-semibold leading-none text-orange-400">Huzzah</h1>
        <p className="text-xl font-light text-orange-500">code however the f*#k you want</p>
      </header>

      <section className="mb-5">
        <p>
          Huzzah is the laziest editor imaginable - write pseudocode and let AI generate the equivalent in any language.
          Made for only the most lackluster devs, the absolute bottom of the programming barrel.
        </p>
      </section>

      <section className="mb-5">
        <p>
          I don&apos;t like how Copilot suggests one line at a time while you&apos;re coding.
          It takes the joy away from actually having to think about the problem itself.
          What I want is an editor that lets me write code in whatever manner makes the most sense to me, then turns it into an acceptable format in any target language.
          I feel that is a much better AI interface, though you can&apos;t really get that UX in standard editors, so I&apos;m toying with this idea.
        </p>
      </section>

      <section className="mb-5">
        <p>Here&apos;s an example. Just write some shitty pseudo code:</p>

        <div className="px-6 pt-0 pb-5 border rounded bg-slate-200 border-slate-300 w-fit text-slate-800">
          {renderedPseudoBlock !== '' && (
            <pre><code>{renderedPseudoBlock}</code></pre>
          )}
        </div>
      </section>

      <section className="mb-5">
        <p>And here&apos;s what Huzzah will give you in Typescript:</p>

        <div className="px-6 pt-0 pb-5 border rounded bg-slate-200 border-slate-300 w-fit text-slate-800">
          {renderedTSBlock !== '' && (
            <pre><code>{renderedTSBlock}</code></pre>
          )}
        </div>
      </section>

      <section className="mb-5">
        <p>Aaand here&apos;s what you will get in Rust:</p>

        <div className="px-6 pt-0 pb-5 border rounded bg-slate-200 border-slate-300 w-fit text-slate-800">
          {renderedRsBlock !== '' && (
            <pre><code>{renderedRsBlock}</code></pre>
          )}
        </div>
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

      <footer className="px-5 pb-5 mt-10 text-center">
        <small>Made in 2023 by Daniel Vaughn, a lazy bastard</small>
      </footer>
    </main>
  )
}

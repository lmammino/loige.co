import React, { Component, Fragment } from 'react'

import Avatar from './Avatar'

class WithPeople extends Component {
  render () {
    const { people, prefix } = this.props
    const withPeople = conjunctions(people)

    return <Fragment>{withPeople && withPeople.length > 0 && (
      <Fragment>
        {prefix}{' '}
        {withPeople.comaSeparated.map((person, index) => {
          return (
            <Fragment key={person.name}>
              <Avatar link={person.link} name={person.name} image={person.image}/>
              {index < withPeople.comaSeparated.length - 1 && ', '}
            </Fragment>
          )
        })}
        {withPeople.and && (
          <Fragment key={withPeople.and.name}>
            &nbsp;and{' '}
            <Avatar link={withPeople.and.link} name={withPeople.and.name} image={withPeople.and.image}/>
          </Fragment>
        )}
      </Fragment>
    )}
    </Fragment>
  }
}

export default WithPeople

function conjunctions (arr) {
  if (!arr) {
    return []
  }

  const c = {
    comaSeparated: null,
    and: null,
    length: arr.length
  }

  if (arr.length === 1) {
    c.comaSeparated = arr
  } else {
    const last = arr[arr.length - 1]
    c.comaSeparated = arr.slice(0, arr.length - 1)
    c.and = last
  }

  return c
}

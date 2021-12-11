class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    /** ------logic ------
     * initialize counter to 0
     * set currentVampire = this
     * check if current vampire's creator is null (then we are at original)
     * if true, return counter
     * else 
     * set currentVampire = this.creator
     * counter++
     * loop again
     * since we don't know how many times we will loop, we should use a while loop
     * with condition: (currentVampire.creator) since if truthy, not original, otherwise it is the original and we should jump out
     * and return the counter
     */

    let counter = 0;
    let currentVampire = this;

    while (currentVampire.creator) {
      currentVampire = currentVampire.creator;
      counter++;
    }
    return counter;
  }

  // Returns true if this vampire is more senior than the input vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    /** ---- logic ----
     * 1. numberOfVampiresFromOriginal for this
     * 2. numberOfVampiresFromOriginal for vampire (input)
     * return (1 < 2)
     */
    return (this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal);

  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {
    let onVampire = this;
    let inputVampire = vampire;

  /** ---- logic ----
   * check if either vampire is the original 
   * if either one is, return the original
   * 
   * then check if input and current are the same,
   * if true, return current
   * 
   * const getAncestors = (vampire) {
   * let myAncestors = []
   * then, get ancestors for current and input and put each into their own arrays
   * -- to do this, do a while loop (givenVampire.creator)
   * -- myAncestors.push(givenVampire.creator)
   * -- givenVampire = given Vampire.creator
   * 
   * return myAncestors;
   * 
   * onVampireAncestors = getAncestors(onVampire);
   * inputVampireAncestors = getAncestors(inputVampire);
   * 
   * commonAncestors = onVampireAncestors.filter(ancestor => inputVampireAncestors.includes(ancestor))
   * 
   * return commonAncestors[0];
   * 
   */
    if (!onVampire.creator) return onVampire;
    if (!inputVampire.creator) return inputVampire;

    if (onVampire === inputVampire) return onVampire;

    if (onVampire === inputVampire.creator) return onVampire;
    
    if (inputVampire === onVampire.creator) return inputVampire;

    const getAncestors = (vampire) => {
      let myAncestors = [];
      let currentVampire = vampire;
      while (currentVampire.creator) {
        myAncestors.push(currentVampire.creator);
        currentVampire = currentVampire.creator;
      }
      return myAncestors;
    }

    const onVampireAncestors = getAncestors(onVampire);
    const inputVampireAncestors = getAncestors(inputVampire);

    const commonAncestors = onVampireAncestors.filter(ancestor => inputVampireAncestors.includes(ancestor));
    return commonAncestors[0];
    
    // previous attempt (not passing all tests)
    // const checkCurrentVampireAncestors = () => {
    //   // both vampires have creators
    //   while (currentVampire.creator && inputVampire.creator) {
    //     if (currentVampire === inputVampire.creator) {
    //       return currentVampire;
    //     }
    //     if (inputVampire === currentVampire.creator) {
    //       return inputVampire;
    //     }
    //     if (inputVampire.creator === currentVampire.creator) {
    //       return inputVampire.creator;
    //     }
    //     if (inputVampire === currentVampire) {
    //       return inputVampire;
    //     }
    //     // want to update currentVampire to go up tree
    //     currentVampire = currentVampire.creator
    //   }

    //   if (!currentVampire.creator) {
    //     return currentVampire;
    //   } else if (!inputVampire.creator) {
    //     return inputVampire;
    //   }
    // }

    // const checkInputVampireAncestors = () => {
    //   // both vampires have creators
    //   while (currentVampire.creator && inputVampire.creator) {
    //     console.log('when checking input Vampire ancestors: current Vamp =', currentVampire.name, "input vamp = ", inputVampire.name);
    //     if (currentVampire === inputVampire.creator) {
    //       return currentVampire;
    //     }
    //     if (inputVampire === currentVampire.creator) {
    //       return inputVampire;
    //     }
    //     if (inputVampire.creator === currentVampire.creator) {
    //       return inputVampire.creator;
    //     }
    //     if (inputVampire === currentVampire) {
    //       return inputVampire;
    //     }
    //     // want to update inputVampire to go up tree
    //     inputVampire = inputVampire.creator
    //   }

    //   if (!currentVampire.creator) {
    //     return currentVampire;
    //   } else if (!inputVampire.creator) {
    //     return inputVampire;
    //   }
    // }

    // if (checkCurrentVampireAncestors().numberOfVampiresFromOriginal >= checkInputVampireAncestors().numberOfVampiresFromOriginal) {
    //   return checkCurrentVampireAncestors();
    // } else {
    //   return checkInputVampireAncestors();
    // }

  }
}

module.exports = Vampire;

const original = new Vampire('Original', 1000);

const bart = new Vampire('Bart', 1002);

const ansel = new Vampire('Ansel', 1003);

const sarah = new Vampire('Sarah', 1004);

const elgort = new Vampire('Elgort', 1005);

const andrew = new Vampire('Andrew', 1006)

original.addOffspring(bart);
original.addOffspring(ansel);

ansel.addOffspring(elgort);
ansel.addOffspring(sarah);

elgort.addOffspring(andrew);
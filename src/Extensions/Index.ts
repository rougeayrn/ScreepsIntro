import Creep_Extended from './Creep'
import Utility from 'utils/Utilities'

export default function prototypeExtender(): void {
    Utility.extendClass(Creep, Creep_Extended)
}

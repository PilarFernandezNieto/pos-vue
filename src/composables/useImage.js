import { ref, computed } from "vue"
import { useFirebaseStorage } from "vuefire"
import {ref as storageRef, uploadBytesResumable, getDownloadURL} from "firebase/storage"
import { uid } from "uid"

export default function useImage(){

    const storage = useFirebaseStorage()
    const url = ref("")

    const onFileChange = e => {
        const file = e.target.files[0]
        const filename = uid() + ".jpg"
        const sRef = storageRef(storage, `/products/${filename}`)

        // Sube el archivo
        const uploadTask = uploadBytesResumable(sRef, file)
        uploadTask.on("state_changed", 
            () => {},
            (error)=> console.log(error),
            () => {
                // La imagen ya se subió
                getDownloadURL(uploadTask.snapshot.ref)
                    .then((dowloadURL) =>{
                        url.value = dowloadURL
                    } )
            }
        )
    }

    const isImageUploaded = computed(() => {
        return url.value ? url.value : null
    })

    return {
        url,
        onFileChange,
        isImageUploaded
    }
}
import { LoginForm } from "@/Component/LoginForm"
import { BlurFade } from "@/components/magicui/blur-fade"
import { GalleryVerticalEnd } from "lucide-react"



export default function LoginPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
         <BlurFade delay={0.50} inView>

        <LoginForm />
         </BlurFade>
      </div>
    </div>
  )
}

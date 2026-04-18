import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    /** Acesso a partir de outro dispositivo (LAN / Tailscale); sem isto só responde em localhost. */
    host: true,
    /**
     * MagicDNS usa hostnames `*.ts.net`; o Vite 6+ valida o header Host e bloqueia nomes desconhecidos.
     * Em desenvolvimento, permitir qualquer host evita erro ao abrir `http://<nome-magicdns>:5173`.
     */
    allowedHosts: true,
  },
})

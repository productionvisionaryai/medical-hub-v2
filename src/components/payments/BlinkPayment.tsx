'use client';

import { QRCodeSVG } from 'qrcode.react'; // npm install qrcode.react
import { Zap, ShieldCheck, ExternalLink } from 'lucide-react';

export default function BlinkPayment() {
  // Nexus Note: Sustituye con tu dirección real de Blink (p.ej. pablo@blink.sv)
  const lnAddress = "tu_usuario@blink.sv"; 
  const qrValue = `lightning:${lnAddress}`;

  return (
    <section className="my-6 p-6 bg-slate-900 rounded-[2rem] text-white shadow-2xl relative overflow-hidden">
      {/* Glow Effect de Bitcoin */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-orange-500/20 blur-3xl rounded-full"></div>
      
      <div className="relative z-10 flex flex-col items-center">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 bg-orange-500 rounded-lg">
            <Zap size={16} className="text-white fill-current" />
          </div>
          <h3 className="text-sm font-bold uppercase tracking-widest text-orange-400">
            Aporte Voluntario / Copago
          </h3>
        </div>

        <p className="text-[11px] text-slate-400 text-center mb-6 px-4">
          Utiliza **Blink Wallet** o cualquier billetera Lightning. 
          Escanea y elige el monto que desees aportar por la consulta.
        </p>

        {/* QR de Blink */}
        <div className="bg-white p-4 rounded-3xl shadow-inner mb-6">
          <QRCodeSVG 
            value={qrValue} 
            size={180}
            level="H"
            includeMargin={false}
            imageSettings={{
              src: "https://www.blink.sv/favicon.ico",
              x: undefined, y: undefined, height: 30, width: 30, excavate: true,
            }}
          />
        </div>

        <div className="w-full space-y-3">
          <div className="flex items-center justify-center gap-2 py-2 px-4 bg-slate-800 rounded-xl border border-slate-700">
            <span className="text-[10px] font-mono text-slate-300">{lnAddress}</span>
          </div>
          
          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
            <div className="flex items-center gap-1.5 text-[9px] text-slate-500">
              <ShieldCheck size={12} className="text-orange-500" />
              Pago Instantáneo vía Lightning
            </div>
            <div className="text-[9px] font-bold text-slate-400 flex items-center gap-1">
              Powered by <span className="text-white">Blink</span> <ExternalLink size={8}/>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

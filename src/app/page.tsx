"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AlarmClock, Building2, Leaf } from "lucide-react";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import UsersNavbar from "@/components/UsersNavbar";

const perks = [
    {
      name: 'Eco-friendly',
      Icon: Leaf,
      description:
        'Contribuye al cuidado del medio ambiente optimizando las rutas de recolección y reduciendo emisiones de CO2.',
    },
    {
      name: 'Ciudad Limpia',
      Icon: Building2,
      description:
        'Mantén tu comunidad limpia reportando problemas rápidamente y facilitando una respuesta inmediata.',
    },
    {
      name: 'Respuesta Rápida',
      Icon: AlarmClock,
      description:"Sistema de alertas que garantiza la atención inmediata de los contenedores que requieren mantenimiento urgente."
    },
  ]

const MOCK_REPORTS = [
  { id: 1, containerID: "CONT-2023-A45", problemType: "Contenedor dañado", description: "La tapa no cierra correctamente", imageUrl: "/mock-images/container1.jpg" },
  { id: 2, containerID: "CONT-2023-B78", problemType: "Basura fuera del contenedor", description: null, imageUrl: "/mock-images/container2.jpg" },
  { id: 3, containerID: "CONT-2023-C12", problemType: "Contenedor lleno", description: "Necesita vaciarse urgentemente", imageUrl: null }
];

// Tipos de problemas predefinidos
const PROBLEM_TYPES = [
  "Contenedor lleno",
  "Contenedor dañado",
  "Basura fuera del contenedor",
  "Mal olor",
  "Contenedor bloqueado",
  "Otro"
];

// ID de contenedor mock (simula ser escaneado de un QR)
const MOCK_CONTAINER_ID = "CONT-2024-XYZ789";

export default function Home() {
  // Estado del formulario
  const [containerID, setContainerID] = useState(MOCK_CONTAINER_ID);
  const [problemType, setProblemType] = useState("");
  const [description, setDescription] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [mockReport, setMockReport] = useState<(typeof MOCK_REPORTS[0] & { containerID: string, problemType: string }) | null>(null);

  // Manejar cambios en la imagen seleccionada
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setImage(file);
      
      // Crear una URL para previsualizar la imagen
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  // Eliminar imagen seleccionada
  const handleRemoveImage = () => {
    setImage(null);
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
      setImagePreview(null);
    }
  };

  // Enviar el formulario (simulado)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!containerID) {
      toast.error("Por favor ingresa un ID de contenedor");
      return;
    }
    
    if (!problemType) {
      toast.error("Por favor selecciona un tipo de problema");
      return;
    }
    
    setIsSubmitting(true);
    
    setTimeout(() => {
      // Seleccionar un reporte mock aleatorio como respuesta
      const randomReport = MOCK_REPORTS[Math.floor(Math.random() * MOCK_REPORTS.length)];
      
      // Combinar datos del formulario con respuesta mock
      const submittedReport = {
        ...randomReport,
        containerID: containerID,
        problemType: problemType,
        description: description || randomReport.description || "", 
        imageUrl: imagePreview || randomReport.imageUrl || null
      };
      
      setMockReport(submittedReport);
      setSubmitted(true);
      setIsSubmitting(false);
      toast.success("¡Reporte enviado con éxito!");
    }, 1500);
  };

  // Reiniciar el formulario
  const handleReset = () => {
    setContainerID(MOCK_CONTAINER_ID);
    setProblemType("");
    setDescription("");
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }
    setImage(null);
    setImagePreview(null);
    setSubmitted(false);
    setMockReport(null);
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-6 bg-white text-black">
    <UsersNavbar />

      <main className="">
<MaxWidthWrapper>

        {!submitted ? (
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Nuevo Reporte</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="containerID" className="block font-medium">
                    ID del Contenedor <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="containerID"
                      type="text"
                      value={containerID}
                      onChange={(e) => setContainerID(e.target.value)}
                      required
                      placeholder="ID del contenedor (escaneado)"
                      className="flex-1"
                    />
                  </div>
                  <p className="text-xs text-gray-500">Este campo se completará automáticamente al escanear el código QR</p>
                </div>

                <div className="space-y-2">
                  <label htmlFor="problemType" className="block font-medium">
                    Tipo de Problema <span className="text-red-500">*</span>
                  </label>
                  <Select
                    required
                    value={problemType}
                    onValueChange={setProblemType}
                  >
                    <SelectTrigger id="problemType">
                      <SelectValue placeholder="Selecciona un problema" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      {PROBLEM_TYPES.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="image" className="block font-medium">
                    Imagen (Opcional)
                  </label>
                  <div className="flex flex-col gap-2">
                    <Input
                      id="image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="cursor-pointer"
                    />
                    {imagePreview && (
                      <div className="relative">
                        <div className="mt-2 relative h-40 w-full rounded-md overflow-hidden">
                          <Image
                            src={imagePreview}
                            alt="Vista previa"
                            fill
                            style={{ objectFit: "cover" }}
                          />
                        </div>
                        <button
                          type="button"
                          onClick={handleRemoveImage}
                          className="absolute top-3 right-3 bg-red-500 text-white p-1 rounded-full w-6 h-6 flex items-center justify-center"
                        >
                          ×
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="description" className="block font-medium">
                    Descripción (Opcional)
                  </label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Proporciona detalles adicionales sobre el problema..."
                    rows={4}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-green-700 hover:bg-emerald-700 text-white"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Enviando..." : "Enviar Reporte"}
                </Button>
              </form>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle className="text-center text-emerald-600">¡Reporte Enviado!</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockReport && (
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold">ID del Contenedor:</h3>
                    <p className="font-mono bg-gray-100 p-2 rounded">{mockReport.containerID}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold">Tipo de Problema:</h3>
                    <p>{mockReport.problemType}</p>
                  </div>
                  
                  {mockReport.description && (
                    <div>
                      <h3 className="font-semibold">Descripción:</h3>
                      <p className="bg-gray-50 p-2 rounded">{mockReport.description}</p>
                    </div>
                  )}
                  
                  {mockReport.imageUrl && (
                    <div>
                      <h3 className="font-semibold">Imagen:</h3>
                      <div className="relative h-48 w-full rounded-md overflow-hidden">
                        <Image
                          src={mockReport.imageUrl}
                          alt="Imagen del reporte"
                          fill
                          style={{ objectFit: "cover" }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button 
                onClick={handleReset} 
                className="w-full bg-emerald-600 hover:bg-emerald-700"
              >
                Crear Nuevo Reporte
              </Button>
            </CardFooter>
          </Card>
        )}
          <div className='grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-0 pt-10 pb-20'>
            {perks.map((perk) => (
              <div
                key={perk.name}
                className='text-center md:flex md:items-start md:text-left lg:block lg:text-center'>
                <div className='md:flex-shrink-0 flex justify-center'>
                  <div className='h-16 w-16 flex items-center justify-center rounded-full bg-green-100 text-green-800'>
                    {<perk.Icon className='w-1/3 h-1/3' />}
                  </div>
                </div>

                <div className='mt-6 md:ml-4 md:mt-0 lg:ml-0 lg:mt-6'>
                  <h3 className='text-base font-medium text-gray-900'>
                    {perk.name}
                  </h3>
                  <p className='mt-3 text-sm text-muted-foreground'>
                    {perk.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </MaxWidthWrapper>
      </main>
    </div>
  );
}
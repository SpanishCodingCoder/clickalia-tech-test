// Queremos poder tipar las Request de Express que nos llegan a las interfaces definidas por nosotros
export interface TypedRequestBody<T> extends Express.Request { body: T }

// Extractor de tipos genérico para la factoría
export type ExtractInstanceType<T> = T extends new () => infer R ? R : never;
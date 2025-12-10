import mongoose from 'mongoose';
import softDelete from './softDelete';

export function createSchema<DocType, DocTypeMethods = any>(
  definition?: mongoose.SchemaDefinition<
    mongoose.SchemaDefinitionType<DocType>
  >,
  options?:  any,
): mongoose.Schema<
  DocType,
  mongoose.Model<DocType, any, DocTypeMethods, any>,
  DocTypeMethods
> {
  const schema = new mongoose.Schema<DocType, any, DocTypeMethods>(definition, {
    timestamps: true,
    ...options,
  });

  return schema;
}

export function createSchemaWithSoftDelete<DocType, DocTypeMethods = any>(
  definition?: mongoose.SchemaDefinition<
    mongoose.SchemaDefinitionType<DocType>
  >,
): mongoose.Schema<
  DocType,
  mongoose.Model<DocType, any, DocTypeMethods, any>,
  DocTypeMethods
> {
  const schema = createSchema(definition);

  schema.plugin(softDelete);

  return schema;
}
